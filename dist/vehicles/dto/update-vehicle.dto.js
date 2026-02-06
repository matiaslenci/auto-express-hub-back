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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVehicleDto = void 0;
const class_validator_1 = require("class-validator");
const vehicle_entity_1 = require("../../database/vehicle.entity");
const swagger_1 = require("@nestjs/swagger");
class UpdateVehicleDto {
    marca;
    modelo;
    anio;
    precio;
    moneda;
    tipo;
    transmision;
    combustible;
    kilometraje;
    color;
    descripcion;
    localidad;
    fotos;
    activo;
}
exports.UpdateVehicleDto = UpdateVehicleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The brand of the vehicle.',
        example: 'Toyota',
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: 'La marca debe ser una cadena de texto' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVehicleDto.prototype, "marca", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The model of the vehicle.',
        example: 'Corolla',
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: 'El modelo debe ser una cadena de texto' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVehicleDto.prototype, "modelo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The manufacturing year of the vehicle.',
        example: 2022,
        required: false,
    }),
    (0, class_validator_1.IsInt)({ message: 'El año debe ser un número entero' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateVehicleDto.prototype, "anio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The price of the vehicle.',
        example: 25000.0,
        required: false,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'El precio debe ser un número' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateVehicleDto.prototype, "precio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Currency type: ARS (pesos argentinos), USD (dólares), or CONSULTAR (price on request).',
        enum: vehicle_entity_1.TipoMoneda,
        example: vehicle_entity_1.TipoMoneda.USD,
        required: false,
    }),
    (0, class_validator_1.IsEnum)(vehicle_entity_1.TipoMoneda, { message: 'La moneda debe ser un valor válido' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVehicleDto.prototype, "moneda", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The type of the vehicle.',
        example: 'Sedán',
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: 'El tipo debe ser una cadena de texto' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVehicleDto.prototype, "tipo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The transmission type of the vehicle.',
        example: 'Automática',
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: 'La transmisión debe ser una cadena de texto' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVehicleDto.prototype, "transmision", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The fuel type of the vehicle.',
        example: 'Gasolina',
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: 'El combustible debe ser una cadena de texto' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVehicleDto.prototype, "combustible", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The kilometraje of the vehicle.',
        example: 15000,
        required: false,
    }),
    (0, class_validator_1.IsInt)({ message: 'El kilometraje debe ser un número entero' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateVehicleDto.prototype, "kilometraje", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The color of the vehicle.',
        example: 'Rojo',
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: 'El color debe ser una cadena de texto' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVehicleDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'A description of the vehicle.',
        example: 'En excelente estado, único dueño.',
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: 'La descripción debe ser una cadena de texto' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVehicleDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'La localidad/ciudad donde se encuentra el vehículo.',
        example: 'Santa Fe',
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: 'La localidad debe ser una cadena de texto' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateVehicleDto.prototype, "localidad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'An array of URLs for the vehicle’s photos.',
        type: [String],
        example: [
            'https://example.com/photo1.jpg',
            'https://example.com/photo2.jpg',
        ],
        required: false,
    }),
    (0, class_validator_1.IsArray)({ message: 'Las fotos deben ser un arreglo' }),
    (0, class_validator_1.IsString)({ each: true, message: 'Cada foto debe ser una URL (cadena de texto)' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateVehicleDto.prototype, "fotos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indicates if the vehicle is available for sale.',
        required: false,
    }),
    (0, class_validator_1.IsBoolean)({ message: 'Activo debe ser un valor booleano' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateVehicleDto.prototype, "activo", void 0);
//# sourceMappingURL=update-vehicle.dto.js.map