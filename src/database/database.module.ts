
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from './agency.entity';
import { Vehicle } from './vehicle.entity';
import { VehicleAnalytics } from './vehicle-analytics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agency, Vehicle, VehicleAnalytics])],
  exports: [TypeOrmModule],
})
export class DatabaseModule { }
