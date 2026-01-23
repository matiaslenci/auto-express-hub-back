import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Agency } from 'src/database/agency.entity';
export declare class VehiclesController {
    private readonly vehiclesService;
    constructor(vehiclesService: VehiclesService);
    createVehicle(createVehicleDto: CreateVehicleDto, user: Agency): Promise<import("../database/vehicle.entity").Vehicle>;
    getVehicles(agencyId?: string): Promise<import("../database/vehicle.entity").Vehicle[]>;
    getVehicleById(id: string): Promise<import("../database/vehicle.entity").Vehicle>;
    updateVehicle(id: string, updateVehicleDto: UpdateVehicleDto, user: Agency): Promise<import("../database/vehicle.entity").Vehicle>;
    deleteVehicle(id: string, user: Agency): Promise<{
        message: string;
    }>;
    incrementView(id: string): Promise<import("../database/vehicle.entity").Vehicle>;
    incrementWhatsAppClick(id: string): Promise<import("../database/vehicle.entity").Vehicle>;
}
