
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { VehicleAnalytics } from '../database/vehicle-analytics.entity';
import { Vehicle } from '../database/vehicle.entity';
import { Agency } from '../database/agency.entity';

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectRepository(VehicleAnalytics)
        private readonly analyticsRepository: Repository<VehicleAnalytics>,
        @InjectRepository(Vehicle)
        private readonly vehicleRepository: Repository<Vehicle>,
    ) { }

    async registerView(vehicleId: string): Promise<void> {
        const date = new Date().toISOString().split('T')[0];
        let analytics = await this.analyticsRepository.findOne({
            where: { vehicleId, date: date as any },
        });

        if (!analytics) {
            analytics = this.analyticsRepository.create({
                vehicleId,
                date: date as any,
                viewsCount: 1,
            });
        } else {
            analytics.viewsCount += 1;
        }

        await this.analyticsRepository.save(analytics);
    }

    async registerWhatsAppClick(vehicleId: string): Promise<void> {
        const date = new Date().toISOString().split('T')[0];
        let analytics = await this.analyticsRepository.findOne({
            where: { vehicleId, date: date as any },
        });

        if (!analytics) {
            analytics = this.analyticsRepository.create({
                vehicleId,
                date: date as any,
                clicksCount: 1,
            });
        } else {
            analytics.clicksCount += 1;
        }

        await this.analyticsRepository.save(analytics);
    }

    async getAgencySummary(agencyId: string) {
        const vehicles = await this.vehicleRepository.find({
            where: { agencyId },
            select: ['id', 'marca', 'modelo', 'vistas', 'clicksWhatsapp'],
            order: { vistas: 'DESC' },
            take: 5,
        });

        const stats = await this.analyticsRepository
            .createQueryBuilder('analytics')
            .innerJoin('analytics.vehicle', 'vehicle')
            .where('vehicle.agencyId = :agencyId', { agencyId })
            .select('SUM(analytics.viewsCount)', 'totalViews')
            .select('SUM(analytics.clicksCount)', 'totalClicks')
            .getRawOne();

        const totalViews = parseInt(stats.totalViews) || 0;
        const totalClicks = parseInt(stats.totalClicks) || 0;
        const conversionRate = totalViews > 0 ? (totalClicks / totalViews) * 100 : 0;

        return {
            topVehicles: vehicles,
            totalViews,
            totalClicks,
            conversionRate: parseFloat(conversionRate.toFixed(2)),
        };
    }

    async getVehicleStats(vehicleId: string, days: number = 30) {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - days);

        const stats = await this.analyticsRepository.find({
            where: {
                vehicleId,
                date: Between(startDate as any, endDate as any),
            },
            order: { date: 'ASC' },
        });

        return stats;
    }
}
