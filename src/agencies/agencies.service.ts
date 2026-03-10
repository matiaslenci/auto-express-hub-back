import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agency } from 'src/database/agency.entity';
import { UpdateAgencyDto } from './dto/update-agency.dto';

/**
 * Extrae solo el nombre de archivo de un valor que puede ser una URL completa
 * o ya un filename. Ej: "https://domain.com/uploads/agencies/abc.webp" → "abc.webp"
 */
function extractFilename(value: string): string {
  try {
    const url = new URL(value);
    const segments = url.pathname.split('/').filter(Boolean);
    return segments.length > 0 ? segments[segments.length - 1] : value;
  } catch {
    return value;
  }
}

@Injectable()
export class AgenciesService {
  constructor(
    @InjectRepository(Agency)
    private readonly agencyRepository: Repository<Agency>,
  ) { }

  async getAgencyByUsername(username: string): Promise<Omit<Agency, 'password'>> {
    const agency = await this.agencyRepository.findOne({ where: { username } });

    if (!agency) {
      throw new NotFoundException(`Agencia con nombre de usuario ${username} no encontrada`);
    }

    const { password, ...result } = agency;
    return result;
  }

  async updateProfile(
    id: string,
    updateAgencyDto: UpdateAgencyDto,
  ): Promise<Omit<Agency, 'password'>> {
    // Normalizar logo/portada: si el frontend envía URLs completas, extraer solo el filename
    if (updateAgencyDto.logo) {
      updateAgencyDto.logo = extractFilename(updateAgencyDto.logo);
    }
    if (updateAgencyDto.portada) {
      updateAgencyDto.portada = extractFilename(updateAgencyDto.portada);
    }

    const agency = await this.agencyRepository.preload({
      id,
      ...updateAgencyDto,
    });

    if (!agency) {
      throw new NotFoundException(`Agencia con ID ${id} no encontrada`);
    }

    await this.agencyRepository.save(agency);
    const { password, ...result } = agency;
    return result;
  }
}
