import { Repository } from 'typeorm';
import { Vehicle } from 'src/database/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Agency } from 'src/database/agency.entity';
export declare class VehiclesService {
    private readonly vehicleRepository;
    constructor(vehicleRepository: Repository<Vehicle>);
    createVehicle(createVehicleDto: CreateVehicleDto, user: Agency): Promise<Vehicle>;
    getVehicles(agencyId?: string): Promise<Vehicle[]>;
    getVehicleById(id: string): Promise<Vehicle>;
    updateVehicle(id: string, updateVehicleDto: UpdateVehicleDto, user: Agency): Promise<Vehicle>;
    deleteVehicle(id: string, user: Agency): Promise<{
        message: string;
    }>;
    incrementView(id: string): Promise<Vehicle>;
    incrementWhatsAppClick(id: string): Promise<Vehicle>;
}
