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
exports.AgenciesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const agencies_service_1 = require("./agencies.service");
const update_agency_dto_1 = require("./dto/update-agency.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const agency_entity_1 = require("../database/agency.entity");
let AgenciesController = class AgenciesController {
    agenciesService;
    constructor(agenciesService) {
        this.agenciesService = agenciesService;
    }
    async getAgencyByUsername(username) {
        return this.agenciesService.getAgencyByUsername(username);
    }
    async updateProfile(user, updateAgencyDto) {
        return this.agenciesService.updateProfile(user.id, updateAgencyDto);
    }
};
exports.AgenciesController = AgenciesController;
__decorate([
    (0, common_1.Get)(':username'),
    (0, swagger_1.ApiOperation)({ summary: 'Get agency public profile by username' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the agency data.',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Agency not found.' }),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AgenciesController.prototype, "getAgencyByUsername", null);
__decorate([
    (0, common_1.Patch)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update own agency profile' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The profile has been successfully updated.',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Agency not found.' }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agency_entity_1.Agency,
        update_agency_dto_1.UpdateAgencyDto]),
    __metadata("design:returntype", Promise)
], AgenciesController.prototype, "updateProfile", null);
exports.AgenciesController = AgenciesController = __decorate([
    (0, swagger_1.ApiTags)('Agencies'),
    (0, common_1.Controller)('agencies'),
    __metadata("design:paramtypes", [agencies_service_1.AgenciesService])
], AgenciesController);
//# sourceMappingURL=agencies.controller.js.map