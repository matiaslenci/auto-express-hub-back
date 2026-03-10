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
exports.UpdateAgencyDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateAgencyDto {
    username;
    email;
    nombre;
    logo;
    portada;
    ubicacion;
    whatsapp;
}
exports.UpdateAgencyDto = UpdateAgencyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The new username of the agency.',
        example: 'new_autos_deluxe',
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: 'El nombre de usuario debe ser una cadena de texto' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAgencyDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The new email of the agency.',
        example: 'newcontact@autosdeluxe.com',
        required: false,
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'El email debe ser un correo válido' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAgencyDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The new display name of the agency.',
        example: 'New Autos Deluxe',
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: 'El nombre debe ser una cadena de texto' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAgencyDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Nombre de archivo del logo de la agencia.",
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11.webp',
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: 'El logo debe ser un nombre de archivo (cadena de texto)' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAgencyDto.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Nombre de archivo de la portada de la agencia.",
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11.webp',
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: 'La portada debe ser un nombre de archivo (cadena de texto)' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAgencyDto.prototype, "portada", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The new location of the agency.',
        example: '456 New Main St, Anytown',
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: 'La ubicación debe ser una cadena de texto' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAgencyDto.prototype, "ubicacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The new WhatsApp number for the agency.',
        example: '+19876543210',
        required: false,
    }),
    (0, class_validator_1.IsString)({ message: 'El WhatsApp debe ser una cadena de texto' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAgencyDto.prototype, "whatsapp", void 0);
//# sourceMappingURL=update-agency.dto.js.map