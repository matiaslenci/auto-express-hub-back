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
exports.CreateVehicleDto = void 0;
const class_validator_1 = require("class-validator");
const vehicle_entity_1 = require("../../database/vehicle.entity");
const swagger_1 = require("@nestjs/swagger");
class CreateVehicleDto {
    marca;
    tipoVehiculo;
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
exports.CreateVehicleDto = CreateVehicleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The brand of the vehicle.', example: 'Toyota' }),
    (0, class_validator_1.IsString)({ message: 'La marca debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La marca es obligatoria' }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "marca", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de vehículo: AUTO o MOTO.',
        enum: vehicle_entity_1.TipoVehiculo,
        example: vehicle_entity_1.TipoVehiculo.AUTO,
    }),
    (0, class_validator_1.IsEnum)(vehicle_entity_1.TipoVehiculo, { message: 'El tipo de vehículo debe ser un valor válido (AUTO o MOTO)' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El tipo de vehículo es obligatorio' }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "tipoVehiculo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The model of the vehicle.', example: 'Corolla' }),
    (0, class_validator_1.IsString)({ message: 'El modelo debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El modelo es obligatorio' }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "modelo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The manufacturing year of the vehicle.',
        example: 2022,
    }),
    (0, class_validator_1.IsInt)({ message: 'El año debe ser un número entero' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El año es obligatorio' }),
    __metadata("design:type", Number)
], CreateVehicleDto.prototype, "anio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The price of the vehicle. Optional when moneda is CONSULTAR.',
        example: 25000.0,
        required: false,
    }),
    (0, class_validator_1.IsNumber)({}, { message: 'El precio debe ser un número' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateVehicleDto.prototype, "precio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Currency type: ARS (pesos argentinos), USD (dólares), or CONSULTAR (price on request).',
        enum: vehicle_entity_1.TipoMoneda,
        example: vehicle_entity_1.TipoMoneda.USD,
    }),
    (0, class_validator_1.IsEnum)(vehicle_entity_1.TipoMoneda, { message: 'La moneda debe ser un valor válido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La moneda es obligatoria' }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "moneda", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The type of the vehicle.', example: 'Sedán' }),
    (0, class_validator_1.IsString)({ message: 'El tipo debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El tipo es obligatorio' }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "tipo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The transmission type of the vehicle.',
        example: 'Automática',
    }),
    (0, class_validator_1.IsString)({ message: 'La transmisión debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La transmisión es obligatoria' }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "transmision", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The fuel type of the vehicle.',
        example: 'Gasolina',
    }),
    (0, class_validator_1.IsString)({ message: 'El combustible debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El combustible es obligatorio' }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "combustible", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The kilometraje of the vehicle.',
        example: 15000,
    }),
    (0, class_validator_1.IsInt)({ message: 'El kilometraje debe ser un número entero' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El kilometraje es obligatorio' }),
    __metadata("design:type", Number)
], CreateVehicleDto.prototype, "kilometraje", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The color of the vehicle.', example: 'Rojo' }),
    (0, class_validator_1.IsString)({ message: 'El color debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El color es obligatorio' }),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'A description of the vehicle.',
        example: 'En excelente estado, único dueño.',
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: 'La descripción debe ser una cadena de texto' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'La localidad/ciudad donde se encuentra el vehículo.',
        example: 'Santa Fe',
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: 'La localidad debe ser una cadena de texto' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVehicleDto.prototype, "localidad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'An array of URLs for the vehicle’s photos.',
        type: [String],
        example: [
            'https://example.com/photo1.jpg',
            'https://example.com/photo2.jpg',
        ],
    }),
    (0, class_validator_1.IsArray)({ message: 'Las fotos deben ser un arreglo' }),
    (0, class_validator_1.IsString)({ each: true, message: 'Cada foto debe ser una URL (cadena de texto)' }),
    __metadata("design:type", Array)
], CreateVehicleDto.prototype, "fotos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indicates if the vehicle is available for sale.',
        default: true,
        required: false,
    }),
    (0, class_validator_1.IsBoolean)({ message: 'Activo debe ser un valor booleano' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateVehicleDto.prototype, "activo", void 0);
//# sourceMappingURL=create-vehicle.dto.js.map