import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from 'src/database/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Agency } from 'src/database/agency.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) { }

  async createVehicle(
    createVehicleDto: CreateVehicleDto,
    user: Agency,
  ): Promise<Vehicle> {
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
    const updatedVehicle = await this.vehicleRepository.preload({
      id,
      ...updateVehicleDto,
    });
    if (!updatedVehicle) {
      throw new NotFoundException(`Vehículo con ID ${id} no encontrado`);
    }
    return this.vehicleRepository.save(updatedVehicle);
  }

  async deleteVehicle(id: string, user: Agency): Promise<{ message: string }> {
    const vehicle = await this.getVehicleById(id);
    if (vehicle.agencyId !== user.id) {
      throw new UnauthorizedException('Solo puedes eliminar tus propios vehículos');
    }
    await this.vehicleRepository.delete(id);
    return { message: 'Vehículo eliminado exitosamente' };
  }

  async incrementView(id: string): Promise<Vehicle> {
    const vehicle = await this.getVehicleById(id);
    vehicle.vistas += 1;
    return this.vehicleRepository.save(vehicle);
  }

  async incrementWhatsAppClick(id: string): Promise<Vehicle> {
    const vehicle = await this.getVehicleById(id);
    vehicle.clicksWhatsapp += 1;
    return this.vehicleRepository.save(vehicle);
  }
}
