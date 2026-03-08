
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { VehicleAnalytics } from '../database/vehicle-analytics.entity';
import { Vehicle } from '../database/vehicle.entity';

@Injectable()
export class AnalyticsService {
    private readonly logger = new Logger(AnalyticsService.name);

    constructor(
        @InjectRepository(VehicleAnalytics)
        private readonly analyticsRepository: Repository<VehicleAnalytics>,
        @InjectRepository(Vehicle)
        private readonly vehicleRepository: Repository<Vehicle>,
    ) { }

    async registerView(vehicleId: string): Promise<void> {
        const date = new Date().toISOString().split('T')[0];

        // Atomic upsert: insert new row or increment existing viewsCount
        await this.analyticsRepository.query(
            `INSERT INTO "vehicle_analytics" ("vehicleId", "date", "viewsCount", "clicksCount")
             VALUES ($1, $2, 1, 0)
             ON CONFLICT ("vehicleId", "date")
             DO UPDATE SET "viewsCount" = "vehicle_analytics"."viewsCount" + 1`,
            [vehicleId, date],
        );

        // Also update the denormalized views counter on the Vehicle entity
        await this.vehicleRepository.query(
            'UPDATE "vehicles" SET "vistas" = "vistas" + 1 WHERE "id" = $1',
            [vehicleId],
        );
    }

    async registerWhatsAppClick(vehicleId: string): Promise<void> {
        const date = new Date().toISOString().split('T')[0];

        // Atomic upsert: insert new row or increment existing clicksCount
        await this.analyticsRepository.query(
            `INSERT INTO "vehicle_analytics" ("vehicleId", "date", "viewsCount", "clicksCount")
             VALUES ($1, $2, 0, 1)
             ON CONFLICT ("vehicleId", "date")
             DO UPDATE SET "clicksCount" = "vehicle_analytics"."clicksCount" + 1`,
            [vehicleId, date],
        );

        // Also update the denormalized clicks counter on the Vehicle entity
        await this.vehicleRepository.query(
            'UPDATE "vehicles" SET "clicksWhatsapp" = "clicksWhatsapp" + 1 WHERE "id" = $1',
            [vehicleId],
        );
    }

    async getAgencySummary(agencyId: string) {
        // Compute per-vehicle views and clicks from analytics table (source of truth)
        // instead of relying on the denormalized counters on the vehicles table,
        // which may not be updated reliably in production.
        const topVehiclesRaw = await this.analyticsRepository
            .createQueryBuilder('analytics')
            .innerJoin('analytics.vehicle', 'vehicle')
            .where('vehicle.agencyId = :agencyId', { agencyId })
            .select('vehicle.id', 'id')
            .addSelect('vehicle.marca', 'marca')
            .addSelect('vehicle.modelo', 'modelo')
            .addSelect('SUM(analytics.viewsCount)', 'vistas')
            .addSelect('SUM(analytics.clicksCount)', 'clicksWhatsapp')
            .groupBy('vehicle.id')
            .addGroupBy('vehicle.marca')
            .addGroupBy('vehicle.modelo')
            .orderBy('SUM(analytics.viewsCount)', 'DESC')
            .limit(5)
            .getRawMany();

        const topVehicles = topVehiclesRaw.map(v => ({
            id: v.id,
            marca: v.marca,
            modelo: v.modelo,
            vistas: parseInt(v.vistas) || 0,
            clicksWhatsapp: parseInt(v.clicksWhatsapp) || 0,
        }));

        const stats = await this.analyticsRepository
            .createQueryBuilder('analytics')
            .innerJoin('analytics.vehicle', 'vehicle')
            .where('vehicle.agencyId = :agencyId', { agencyId })
            .select('SUM(analytics.viewsCount)', 'totalViews')
            .addSelect('SUM(analytics.clicksCount)', 'totalClicks')
            .getRawOne();

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        const startDateString = startDate.toISOString().split('T')[0];

        const dailyStatsRaw = await this.analyticsRepository
            .createQueryBuilder('analytics')
            .innerJoin('analytics.vehicle', 'vehicle')
            .where('vehicle.agencyId = :agencyId', { agencyId })
            .andWhere('analytics.date >= :startDate', { startDate: startDateString })
            .select('analytics.date', 'date')
            .addSelect('SUM(analytics.viewsCount)', 'viewsCount')
            .addSelect('SUM(analytics.clicksCount)', 'clicksCount')
            .groupBy('analytics.date')
            .orderBy('analytics.date', 'ASC')
            .getRawMany();

        const dailyHistory = dailyStatsRaw.map(stat => ({
            date: typeof stat.date === 'string' ? stat.date : new Date(stat.date).toISOString().split('T')[0],
            viewsCount: parseInt(stat.viewsCount) || 0,
            clicksCount: parseInt(stat.clicksCount) || 0,
        }));

        const totalViews = parseInt(stats.totalViews) || 0;
        const totalClicks = parseInt(stats.totalClicks) || 0;
        const conversionRate = totalViews > 0 ? (totalClicks / totalViews) * 100 : 0;

        return {
            topVehicles,
            totalViews,
            totalClicks,
            conversionRate: parseFloat(conversionRate.toFixed(2)),
            dailyHistory,
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
