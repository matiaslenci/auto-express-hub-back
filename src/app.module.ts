import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { Agency } from './database/agency.entity';
import { Vehicle } from './database/vehicle.entity';
import { VehicleAnalytics } from './database/vehicle-analytics.entity';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AgenciesModule } from './agencies/agencies.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { UploadsModule } from './uploads/uploads.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000, // 1 minuto
      limit: 60,  // 60 requests por minuto
    }]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Agency, Vehicle, VehicleAnalytics],
        synchronize: true
        // synchronize: configService.get('NODE_ENV') !== 'production', // Solo sincronizar en desarrollo
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    AuthModule,
    AgenciesModule,
    VehiclesModule,
    UploadsModule,
    AnalyticsModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
