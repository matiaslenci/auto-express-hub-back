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
exports.VehiclesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const throttler_1 = require("@nestjs/throttler");
const vehicles_service_1 = require("./vehicles.service");
const create_vehicle_dto_1 = require("./dto/create-vehicle.dto");
const update_vehicle_dto_1 = require("./dto/update-vehicle.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const agency_entity_1 = require("../database/agency.entity");
let VehiclesController = class VehiclesController {
    vehiclesService;
    constructor(vehiclesService) {
        this.vehiclesService = vehiclesService;
    }
    async createVehicle(createVehicleDto, user) {
        return this.vehiclesService.createVehicle(createVehicleDto, user);
    }
    async getVehicles(agencyId) {
        return this.vehiclesService.getVehicles(agencyId);
    }
    async getMyVehicles(user) {
        console.log('ENTRO A MY VEHICLES');
        return this.vehiclesService.getVehicles(user.id);
    }
    async getVehicleById(id) {
        console.log('ENTRO A GET BY ID:', id);
        return this.vehiclesService.getVehicleById(id);
    }
    async updateVehicle(id, updateVehicleDto, user) {
        return this.vehiclesService.updateVehicle(id, updateVehicleDto, user);
    }
    async deleteVehicle(id, user) {
        return this.vehiclesService.deleteVehicle(id, user);
    }
    async incrementView(id) {
        return this.vehiclesService.incrementView(id);
    }
    async incrementWhatsAppClick(id) {
        return this.vehiclesService.incrementWhatsAppClick(id);
    }
};
exports.VehiclesController = VehiclesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new vehicle' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The vehicle has been successfully created.',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vehicle_dto_1.CreateVehicleDto,
        agency_entity_1.Agency]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "createVehicle", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all vehicles' }),
    (0, swagger_1.ApiQuery)({
        name: 'agencyId',
        required: false,
        description: 'Filter vehicles by agency ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns all vehicles.',
    }),
    __param(0, (0, common_1.Query)('agencyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "getVehicles", null);
__decorate([
    (0, common_1.Get)('my-vehicles'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get vehicles belonging to the authenticated agency' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the vehicles of the authenticated agency.',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agency_entity_1.Agency]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "getMyVehicles", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a vehicle by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the vehicle data.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vehicle not found.' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "getVehicleById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a vehicle' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The vehicle has been successfully updated.',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vehicle not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_vehicle_dto_1.UpdateVehicleDto,
        agency_entity_1.Agency]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "updateVehicle", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a vehicle' }),
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'The vehicle has been successfully deleted.',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vehicle not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, agency_entity_1.Agency]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "deleteVehicle", null);
__decorate([
    (0, common_1.Post)(':id/view'),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Increment vehicle view count' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The view count has been successfully incremented.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vehicle not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "incrementView", null);
__decorate([
    (0, common_1.Post)(':id/whatsapp'),
    (0, common_1.UseGuards)(throttler_1.ThrottlerGuard),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60000 } }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Increment vehicle WhatsApp click count' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The WhatsApp click count has been successfully incremented.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Vehicle not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "incrementWhatsAppClick", null);
exports.VehiclesController = VehiclesController = __decorate([
    (0, swagger_1.ApiTags)('Vehicles'),
    (0, common_1.Controller)('vehicles'),
    __metadata("design:paramtypes", [vehicles_service_1.VehiclesService])
], VehiclesController);
//# sourceMappingURL=vehicles.controller.js.map