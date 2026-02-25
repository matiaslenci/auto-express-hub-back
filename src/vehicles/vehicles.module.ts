import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { AnalyticsModule } from 'src/analytics/analytics.module';

@Module({
  imports: [DatabaseModule, AuthModule, AnalyticsModule],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule { }
