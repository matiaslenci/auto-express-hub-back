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
exports.CreateAgencyDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const agency_entity_1 = require("../../database/agency.entity");
class CreateAgencyDto {
    username;
    email;
    password;
    nombre;
    logo;
    portada;
    ubicacion;
    whatsapp;
    plan;
}
exports.CreateAgencyDto = CreateAgencyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The username of the agency.',
        example: 'autos_deluxe',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAgencyDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The email of the agency.',
        example: 'contact@autosdeluxe.com',
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAgencyDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The password for the agency account.',
        example: 'Securep@ss123',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], CreateAgencyDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The display name of the agency.',
        example: 'Autos Deluxe',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAgencyDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL of the agency’s logo.',
        example: 'https://example.com/logo.png',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAgencyDto.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'URL of the agency’s cover image.',
        example: 'https://example.com/cover.png',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAgencyDto.prototype, "portada", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The location of the agency.',
        example: '123 Main St, Anytown',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAgencyDto.prototype, "ubicacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The WhatsApp number for the agency.',
        example: '+1234567890',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAgencyDto.prototype, "whatsapp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The subscription plan of the agency.',
        enum: agency_entity_1.Plan,
        default: agency_entity_1.Plan.BASICO,
        required: false,
    }),
    (0, class_validator_1.IsEnum)(agency_entity_1.Plan),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAgencyDto.prototype, "plan", void 0);
//# sourceMappingURL=create-agency.dto.js.map