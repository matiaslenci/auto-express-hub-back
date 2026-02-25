import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Agency } from '../database/agency.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Agency])],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule { }
