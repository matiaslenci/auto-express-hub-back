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
exports.Agency = exports.PLAN_LIMITS = exports.Plan = void 0;
const typeorm_1 = require("typeorm");
const vehicle_entity_1 = require("./vehicle.entity");
const swagger_1 = require("@nestjs/swagger");
var Plan;
(function (Plan) {
    Plan["BASICO"] = "basico";
    Plan["PROFESIONAL"] = "profesional";
    Plan["PREMIUM"] = "premium";
})(Plan || (exports.Plan = Plan = {}));
exports.PLAN_LIMITS = {
    [Plan.BASICO]: 10,
    [Plan.PROFESIONAL]: 50,
    [Plan.PREMIUM]: -1,
};
let Agency = class Agency {
    id;
    username;
    email;
    password;
    nombre;
    logo;
    portada;
    ubicacion;
    whatsapp;
    plan;
    limitePublicaciones;
    createdAt;
    updatedAt;
    isAdmin;
    isActive;
    vehicles;
};
exports.Agency = Agency;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The unique identifier of the agency.',
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Agency.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The username of the agency, used for public profile URLs.',
        example: 'autos_deluxe',
        uniqueItems: true,
    }),
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
    __metadata("design:type", String)
], Agency.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The email of the agency, used for login.',
        example: 'contact@autosdeluxe.com',
        uniqueItems: true,
    }),
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: 'varchar', unique: true }),
    __metadata("design:type", String)
], Agency.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', select: false }),
    __metadata("design:type", String)
], Agency.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The display name of the agency.',
        example: 'Autos Deluxe',
    }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Agency.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL of the agency’s logo.',
        example: 'https://example.com/logo.png',
        nullable: true,
    }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Agency.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL of the agency’s cover image.',
        example: 'https://example.com/cover.png',
        nullable: true,
    }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Agency.prototype, "portada", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The location of the agency.',
        example: '123 Main St, Anytown',
        nullable: true,
    }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Agency.prototype, "ubicacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The WhatsApp number for the agency.',
        example: '+1234567890',
        nullable: true,
    }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Agency.prototype, "whatsapp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The subscription plan of the agency.',
        enum: Plan,
        default: Plan.BASICO,
    }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Plan,
        default: Plan.BASICO,
    }),
    __metadata("design:type", String)
], Agency.prototype, "plan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The maximum number of publications allowed for the agency.',
        example: 10,
        default: 10,
    }),
    (0, typeorm_1.Column)({ type: 'integer', default: 10 }),
    __metadata("design:type", Number)
], Agency.prototype, "limitePublicaciones", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The date and time the agency was created.',
        type: 'string',
        format: 'date-time',
    }),
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Agency.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The date and time the agency was last updated.',
        type: 'string',
        format: 'date-time',
    }),
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Agency.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Agency.prototype, "isAdmin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indicates if the agency is currently active (has paid for the month).',
        example: true,
        default: true,
    }),
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Agency.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vehicle_entity_1.Vehicle, (vehicle) => vehicle.agency),
    __metadata("design:type", Array)
], Agency.prototype, "vehicles", void 0);
exports.Agency = Agency = __decorate([
    (0, typeorm_1.Entity)('agencies')
], Agency);
//# sourceMappingURL=agency.entity.js.map