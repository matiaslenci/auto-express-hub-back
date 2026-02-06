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
    plan;
    nombre;
    username;
    email;
    password;
}
exports.CreateAgencyDto = CreateAgencyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The subscription plan of the agency.',
        enum: agency_entity_1.Plan,
        example: agency_entity_1.Plan.BASICO,
    }),
    (0, class_validator_1.IsEnum)(agency_entity_1.Plan, { message: 'El plan debe ser uno de los valores válidos' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El plan es obligatorio' }),
    __metadata("design:type", String)
], CreateAgencyDto.prototype, "plan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The display name of the agency.',
        example: 'Autos Deluxe',
    }),
    (0, class_validator_1.IsString)({ message: 'El nombre debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es obligatorio' }),
    __metadata("design:type", String)
], CreateAgencyDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The username of the agency (URL).',
        example: 'autos_deluxe',
    }),
    (0, class_validator_1.IsString)({ message: 'El nombre de usuario debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre de usuario es obligatorio' }),
    __metadata("design:type", String)
], CreateAgencyDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The email of the agency.',
        example: 'contact@autosdeluxe.com',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'El email debe ser un correo válido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El email es obligatorio' }),
    __metadata("design:type", String)
], CreateAgencyDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The password for the agency account.',
        example: 'Securep@ss123',
    }),
    (0, class_validator_1.IsString)({ message: 'La contraseña debe ser una cadena de texto' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La contraseña es obligatoria' }),
    (0, class_validator_1.MinLength)(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    __metadata("design:type", String)
], CreateAgencyDto.prototype, "password", void 0);
//# sourceMappingURL=create-agency.dto.js.map