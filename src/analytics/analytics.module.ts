
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { VehicleAnalytics } from '../database/vehicle-analytics.entity';
import { Vehicle } from '../database/vehicle.entity';

@Module({
    imports: [TypeOrmModule.forFeature([VehicleAnalytics, Vehicle])],
    controllers: [AnalyticsController],
    providers: [AnalyticsService],
    exports: [AnalyticsService],
})
export class AnalyticsModule { }
