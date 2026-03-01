import { Repository } from 'typeorm';
import { Vehicle } from 'src/database/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Agency } from 'src/database/agency.entity';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { UploadsService } from 'src/uploads/uploads.service';
export declare const MAX_VEHICLE_PHOTOS = 20;
export declare class VehiclesService {
    private readonly vehicleRepository;
    private readonly analyticsService;
    private readonly uploadsService;
    constructor(vehicleRepository: Repository<Vehicle>, analyticsService: AnalyticsService, uploadsService: UploadsService);
    createVehicle(createVehicleDto: CreateVehicleDto, user: Agency): Promise<Vehicle>;
    getVehicles(agencyId?: string): Promise<Vehicle[]>;
    getVehiclesByUsername(username: string): Promise<Vehicle[]>;
    getVehicleById(id: string): Promise<Vehicle>;
    updateVehicle(id: string, updateVehicleDto: UpdateVehicleDto, user: Agency): Promise<Vehicle>;
    deleteVehicle(id: string, user: Agency): Promise<{
        message: string;
    }>;
    incrementView(id: string): Promise<Vehicle>;
    incrementWhatsAppClick(id: string): Promise<Vehicle>;
}
