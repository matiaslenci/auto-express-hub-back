import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from 'src/database/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Agency, PLAN_LIMITS } from 'src/database/agency.entity';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { UploadsService } from 'src/uploads/uploads.service';

export const MAX_VEHICLE_PHOTOS = 20;

/**
 * Extrae solo el nombre de archivo de un valor que puede ser una URL completa
 * o ya un filename. Ej: "https://domain.com/uploads/vehicles/abc.webp" → "abc.webp"
 */
function extractFilename(value: string): string {
  try {
    const url = new URL(value);
    // Es una URL válida, extraer el último segmento del pathname
    const segments = url.pathname.split('/').filter(Boolean);
    return segments.length > 0 ? segments[segments.length - 1] : value;
  } catch {
    // No es una URL, devolver tal cual (ya es un filename)
    return value;
  }
}

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    private readonly analyticsService: AnalyticsService,
    private readonly uploadsService: UploadsService,
  ) { }

  async createVehicle(
    createVehicleDto: CreateVehicleDto,
    user: Agency,
  ): Promise<Vehicle> {
    // Verificar límite de publicaciones según el plan
    const currentVehicleCount = await this.vehicleRepository.count({
      where: { agencyId: user.id },
    });

    const planLimit = PLAN_LIMITS[user.plan];

    // Si el límite no es -1 (sin límite) y se ha alcanzado el máximo
    if (planLimit !== -1 && currentVehicleCount >= planLimit) {
      throw new ForbiddenException(
        `Has alcanzado el límite de ${planLimit} publicaciones de tu plan ${user.plan}. Actualiza tu plan para publicar más vehículos.`
      );
    }

    // Normalizar fotos: si el frontend envía URLs completas, extraer solo el filename
    if (createVehicleDto.fotos) {
      createVehicleDto.fotos = createVehicleDto.fotos.map(extractFilename);
    }

    // Validar límite de fotos al crear
    if (createVehicleDto.fotos && createVehicleDto.fotos.length > MAX_VEHICLE_PHOTOS) {
      throw new BadRequestException(
        `Un vehículo no puede tener más de ${MAX_VEHICLE_PHOTOS} fotos.`,
      );
    }

    const vehicle = this.vehicleRepository.create({
      ...createVehicleDto,
      agency: user,
    });
    return this.vehicleRepository.save(vehicle);
  }

  async getVehicles(agencyId?: string): Promise<Vehicle[]> {
    if (agencyId) {
      return this.vehicleRepository.find({ where: { agencyId } });
    }
    return this.vehicleRepository.find();
  }

  async getVehiclesByUsername(username: string): Promise<Vehicle[]> {
    return this.vehicleRepository.createQueryBuilder('vehicle')
      .innerJoin('vehicle.agency', 'agency')
      .where('agency.username = :username', { username })
      .select([
        'vehicle.id',
        'vehicle.marca',
        'vehicle.tipoVehiculo',
        'vehicle.modelo',
        'vehicle.anio',
        'vehicle.precio',
        'vehicle.moneda',
        'vehicle.tipo',
        'vehicle.transmision',
        'vehicle.combustible',
        'vehicle.kilometraje',
        'vehicle.color',
        'vehicle.descripcion',
        'vehicle.localidad',
        'vehicle.fotos',
        'vehicle.createdAt',
        'vehicle.clicksWhatsapp',
        'vehicle.vistas',
        'vehicle.activo',
        'vehicle.agencyId',
      ])
      .getMany();
  }

  async getVehicleById(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({ where: { id } });
    if (!vehicle) {
      throw new NotFoundException(`Vehículo con ID ${id} no encontrado`);
    }
    return vehicle;
  }

  async updateVehicle(
    id: string,
    updateVehicleDto: UpdateVehicleDto,
    user: Agency,
  ): Promise<Vehicle> {
    const vehicle = await this.getVehicleById(id);
    if (vehicle.agencyId !== user.id) {
      throw new UnauthorizedException('Solo puedes editar tus propios vehículos');
    }

    // Normalizar fotos: si el frontend envía URLs completas, extraer solo el filename
    if (updateVehicleDto.fotos) {
      updateVehicleDto.fotos = updateVehicleDto.fotos.map(extractFilename);
    }

    // Validar límite de fotos al actualizar
    if (updateVehicleDto.fotos && updateVehicleDto.fotos.length > MAX_VEHICLE_PHOTOS) {
      throw new BadRequestException(
        `Un vehículo no puede tener más de ${MAX_VEHICLE_PHOTOS} fotos.`,
      );
    }

    const updatedVehicle = await this.vehicleRepository.preload({
      id,
      ...updateVehicleDto,
    });
    if (!updatedVehicle) {
      throw new NotFoundException(`Vehículo con ID ${id} no encontrado`);
    }
    const saved = await this.vehicleRepository.save(updatedVehicle);

    // Eliminar del disco las fotos que ya no están en el array actualizado.
    // Se ejecuta DESPUÉS de guardar en BD: si falla el filesystem el dato ya
    // está consistente. El borrado es fire-and-forget con logging de errores.
    if (updateVehicleDto.fotos) {
      const newFotosSet = new Set(updateVehicleDto.fotos);
      const removedFotos = vehicle.fotos.filter((f) => !newFotosSet.has(f));
      if (removedFotos.length > 0) {
        void this.uploadsService.deleteImages(removedFotos, 'vehicles');
      }
    }

    return saved;
  }

  async deleteVehicle(id: string, user: Agency): Promise<{ message: string }> {
    const vehicle = await this.getVehicleById(id);
    if (vehicle.agencyId !== user.id) {
      throw new UnauthorizedException('Solo puedes eliminar tus propios vehículos');
    }
    await this.vehicleRepository.delete(id);

    // Limpiar todas las fotos del vehículo del disco una vez eliminado de BD.
    if (vehicle.fotos?.length > 0) {
      void this.uploadsService.deleteImages(vehicle.fotos, 'vehicles');
    }

    return { message: 'Vehículo eliminado exitosamente' };
  }

  async incrementView(id: string): Promise<Vehicle> {
    const vehicle = await this.getVehicleById(id);
    await this.analyticsService.registerView(vehicle.id);
    return this.getVehicleById(id);
  }

  async incrementWhatsAppClick(id: string): Promise<Vehicle> {
    const vehicle = await this.getVehicleById(id);
    await this.analyticsService.registerWhatsAppClick(vehicle.id);
    return this.getVehicleById(id);
  }
}
