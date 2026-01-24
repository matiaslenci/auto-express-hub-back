"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const agency_entity_1 = require("../database/agency.entity");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    agencyRepository;
    jwtService;
    configService;
    constructor(agencyRepository, jwtService, configService) {
        this.agencyRepository = agencyRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(createAgencyDto) {
        const { username, email, password, nombre, plan } = createAgencyDto;
        const existingAgency = await this.agencyRepository.findOne({
            where: [{ username }, { email }],
        });
        if (existingAgency) {
            throw new common_1.ConflictException('El nombre de usuario o correo electrónico ya existe');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const agency = this.agencyRepository.create({
            username,
            email,
            password: hashedPassword,
            nombre,
            plan,
        });
        await this.agencyRepository.save(agency);
        return { message: 'Agencia registrada exitosamente' };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const agency = await this.agencyRepository.findOne({
            where: { email },
            select: ['id', 'password'],
        });
        if (!agency || !agency.password) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const isPasswordMatching = await bcrypt.compare(password, agency.password);
        if (!isPasswordMatching) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const payload = { id: agency.id };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(agency_entity_1.Agency)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map