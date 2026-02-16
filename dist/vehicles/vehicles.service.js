"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vehicle_entity_1 = require("../database/vehicle.entity");
const agency_entity_1 = require("../database/agency.entity");
let VehiclesService = class VehiclesService {
    vehicleRepository;
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }
    async createVehicle(createVehicleDto, user) {
        const currentVehicleCount = await this.vehicleRepository.count({
            where: { agencyId: user.id },
        });
        const planLimit = agency_entity_1.PLAN_LIMITS[user.plan];
        if (planLimit !== -1 && currentVehicleCount >= planLimit) {
            throw new common_1.ForbiddenException(`Has alcanzado el límite de ${planLimit} publicaciones de tu plan ${user.plan}. Actualiza tu plan para publicar más vehículos.`);
        }
        const vehicle = this.vehicleRepository.create({
            ...createVehicleDto,
            agency: user,
        });
        return this.vehicleRepository.save(vehicle);
    }
    async getVehicles(agencyId) {
        if (agencyId) {
            return this.vehicleRepository.find({ where: { agencyId } });
        }
        return this.vehicleRepository.find();
    }
    async getVehicleById(id) {
        const vehicle = await this.vehicleRepository.findOne({ where: { id } });
        if (!vehicle) {
            throw new common_1.NotFoundException(`Vehículo con ID ${id} no encontrado`);
        }
        return vehicle;
    }
    async updateVehicle(id, updateVehicleDto, user) {
        const vehicle = await this.getVehicleById(id);
        if (vehicle.agencyId !== user.id) {
            throw new common_1.UnauthorizedException('Solo puedes editar tus propios vehículos');
        }
        const updatedVehicle = await this.vehicleRepository.preload({
            id,
            ...updateVehicleDto,
        });
        if (!updatedVehicle) {
            throw new common_1.NotFoundException(`Vehículo con ID ${id} no encontrado`);
        }
        return this.vehicleRepository.save(updatedVehicle);
    }
    async deleteVehicle(id, user) {
        const vehicle = await this.getVehicleById(id);
        if (vehicle.agencyId !== user.id) {
            throw new common_1.UnauthorizedException('Solo puedes eliminar tus propios vehículos');
        }
        await this.vehicleRepository.delete(id);
        return { message: 'Vehículo eliminado exitosamente' };
    }
    async incrementView(id) {
        const vehicle = await this.getVehicleById(id);
        vehicle.vistas += 1;
        return this.vehicleRepository.save(vehicle);
    }
    async incrementWhatsAppClick(id) {
        const vehicle = await this.getVehicleById(id);
        vehicle.clicksWhatsapp += 1;
        return this.vehicleRepository.save(vehicle);
    }
};
exports.VehiclesService = VehiclesService;
exports.VehiclesService = VehiclesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehicle_entity_1.Vehicle)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VehiclesService);
//# sourceMappingURL=vehicles.service.js.map