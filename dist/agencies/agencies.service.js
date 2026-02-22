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
exports.AgenciesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const agency_entity_1 = require("../database/agency.entity");
let AgenciesService = class AgenciesService {
    agencyRepository;
    constructor(agencyRepository) {
        this.agencyRepository = agencyRepository;
    }
    async getAgencyByUsername(username) {
        const agency = await this.agencyRepository.findOne({ where: { username } });
        if (!agency) {
            throw new common_1.NotFoundException(`Agencia con nombre de usuario ${username} no encontrada`);
        }
        const { password, ...result } = agency;
        return result;
    }
    async updateProfile(id, updateAgencyDto) {
        const agency = await this.agencyRepository.preload({
            id,
            ...updateAgencyDto,
        });
        if (!agency) {
            throw new common_1.NotFoundException(`Agencia con ID ${id} no encontrada`);
        }
        await this.agencyRepository.save(agency);
        const { password, ...result } = agency;
        return result;
    }
};
exports.AgenciesService = AgenciesService;
exports.AgenciesService = AgenciesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(agency_entity_1.Agency)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AgenciesService);
//# sourceMappingURL=agencies.service.js.map