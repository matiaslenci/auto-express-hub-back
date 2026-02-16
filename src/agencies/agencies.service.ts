import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agency, PLAN_LIMITS } from 'src/database/agency.entity';
import { UpdateAgencyDto } from './dto/update-agency.dto';

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
    // Si se está actualizando el plan, sincronizar el límite de publicaciones
    if (updateAgencyDto.plan) {
      const planLimit = PLAN_LIMITS[updateAgencyDto.plan];
      updateAgencyDto.limitePublicaciones = planLimit === -1 ? 999999 : planLimit;
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
