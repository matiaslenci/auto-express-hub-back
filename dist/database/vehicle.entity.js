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
exports.Vehicle = exports.TipoVehiculo = exports.TipoMoneda = void 0;
const typeorm_1 = require("typeorm");
const agency_entity_1 = require("./agency.entity");
const swagger_1 = require("@nestjs/swagger");
var TipoMoneda;
(function (TipoMoneda) {
    TipoMoneda["ARS"] = "ARS";
    TipoMoneda["USD"] = "USD";
    TipoMoneda["CONSULTAR"] = "CONSULTAR";
})(TipoMoneda || (exports.TipoMoneda = TipoMoneda = {}));
var TipoVehiculo;
(function (TipoVehiculo) {
    TipoVehiculo["AUTO"] = "AUTO";
    TipoVehiculo["MOTO"] = "MOTO";
})(TipoVehiculo || (exports.TipoVehiculo = TipoVehiculo = {}));
let Vehicle = class Vehicle {
    id;
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
    vistas;
    clicksWhatsapp;
    createdAt;
    agency;
    agencyId;
};
exports.Vehicle = Vehicle;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The unique identifier of the vehicle.',
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Vehicle.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The brand of the vehicle.', example: 'Toyota' }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Vehicle.prototype, "marca", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de vehículo: AUTO o MOTO.',
        enum: TipoVehiculo,
        example: TipoVehiculo.AUTO,
    }),
    (0, typeorm_1.Column)({ type: 'enum', enum: TipoVehiculo, default: TipoVehiculo.AUTO }),
    __metadata("design:type", String)
], Vehicle.prototype, "tipoVehiculo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The model of the vehicle.', example: 'Corolla' }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Vehicle.prototype, "modelo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The manufacturing year of the vehicle.',
        example: 2022,
    }),
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Vehicle.prototype, "anio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The price of the vehicle.',
        example: 25000.0,
        type: 'number',
        nullable: true,
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], Vehicle.prototype, "precio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Currency type of the price: ARS (pesos argentinos), USD (dólares), or CONSULTAR (price on request).',
        enum: TipoMoneda,
        example: TipoMoneda.USD,
    }),
    (0, typeorm_1.Column)({ type: 'enum', enum: TipoMoneda, default: TipoMoneda.ARS }),
    __metadata("design:type", String)
], Vehicle.prototype, "moneda", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The type of the vehicle.', example: 'Sedán' }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Vehicle.prototype, "tipo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The transmission type of the vehicle.',
        example: 'Automática',
    }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Vehicle.prototype, "transmision", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The fuel type of the vehicle.',
        example: 'Gasolina',
    }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Vehicle.prototype, "combustible", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The kilometraje of the vehicle.',
        example: 15000,
    }),
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], Vehicle.prototype, "kilometraje", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The color of the vehicle.', example: 'Rojo' }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Vehicle.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'A description of the vehicle.',
        example: 'En excelente estado, único dueño.',
        nullable: true,
    }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "descripcion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'La localidad/ciudad donde se encuentra el vehículo.',
        example: 'Santa Fe',
        nullable: true,
    }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Vehicle.prototype, "localidad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'An array of URLs for the vehicle’s photos.',
        type: [String],
        example: [
            'https://example.com/photo1.jpg',
            'https://example.com/photo2.jpg',
        ],
    }),
    (0, typeorm_1.Column)({ type: 'text', array: true }),
    __metadata("design:type", Array)
], Vehicle.prototype, "fotos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indicates if the vehicle is available for sale.',
        default: true,
    }),
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Vehicle.prototype, "activo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The number of times the vehicle has been viewed.',
        default: 0,
    }),
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], Vehicle.prototype, "vistas", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The number of times the WhatsApp link has been clicked.',
        default: 0,
    }),
    (0, typeorm_1.Column)({ type: 'integer', default: 0 }),
    __metadata("design:type", Number)
], Vehicle.prototype, "clicksWhatsapp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The date and time the vehicle was created.',
        type: 'string',
        format: 'date-time',
    }),
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Vehicle.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => agency_entity_1.Agency, (agency) => agency.vehicles, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'agencyId' }),
    __metadata("design:type", agency_entity_1.Agency)
], Vehicle.prototype, "agency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the agency that owns the vehicle.',
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Vehicle.prototype, "agencyId", void 0);
exports.Vehicle = Vehicle = __decorate([
    (0, typeorm_1.Entity)('vehicles')
], Vehicle);
//# sourceMappingURL=vehicle.entity.js.map