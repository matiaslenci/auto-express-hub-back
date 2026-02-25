import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agency } from '../database/agency.entity';
import { UpdateAgencyStatusDto } from './dto/update-agency-status.dto';
import { UpdateAgencyPlanDto } from './dto/update-agency-plan.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Agency)
        private readonly agencyRepository: Repository<Agency>,
    ) { }

    async getAllAgencies() {
        return this.agencyRepository.find({
            order: { createdAt: 'DESC' },
        });
    }

    async updateAgencyStatus(id: string, updateAgencyStatusDto: UpdateAgencyStatusDto) {
        const agency = await this.agencyRepository.findOne({ where: { id } });
        if (!agency) {
            throw new NotFoundException(`Agency with ID ${id} not found`);
        }

        agency.isActive = updateAgencyStatusDto.isActive;
        return this.agencyRepository.save(agency);
    }

    async updateAgencyPlan(id: string, updateAgencyPlanDto: UpdateAgencyPlanDto) {
        const agency = await this.agencyRepository.findOne({ where: { id } });
        if (!agency) {
            throw new NotFoundException(`Agency with ID ${id} not found`);
        }

        agency.plan = updateAgencyPlanDto.plan;
        return this.agencyRepository.save(agency);
    }
}
