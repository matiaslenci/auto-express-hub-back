import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Agency } from './database/agency.entity';
import { Vehicle } from './database/vehicle.entity';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AgenciesModule } from './agencies/agencies.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Agency, Vehicle],
        synchronize: true, // TODO: Modificar en producción
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    AuthModule,
    AgenciesModule,
    VehiclesModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
