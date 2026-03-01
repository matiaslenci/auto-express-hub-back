import { Controller, Get, Patch, Param, Body, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { UpdateAgencyStatusDto } from './dto/update-agency-status.dto';
import { UpdateAgencyPlanDto } from './dto/update-agency-plan.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/admin.guard';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
@ApiBearerAuth()
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('agencies')
    @ApiOperation({ summary: 'Get all agencies (Admin only)' })
    @ApiResponse({ status: 200, description: 'List of all agencies.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async getAllAgencies() {
        return this.adminService.getAllAgencies();
    }

    @Patch('agencies/:id/status')
    @ApiOperation({ summary: 'Update agency active status (Admin only)' })
    @ApiResponse({ status: 200, description: 'Agency status updated successfully.' })
    @ApiResponse({ status: 404, description: 'Agency not found.' })
    async updateAgencyStatus(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateAgencyStatusDto: UpdateAgencyStatusDto,
    ) {
        return this.adminService.updateAgencyStatus(id, updateAgencyStatusDto);
    }

    @Patch('agencies/:id/plan')
    @ApiOperation({ summary: 'Update agency plan (Admin only)' })
    @ApiResponse({ status: 200, description: 'Agency plan updated successfully.' })
    @ApiResponse({ status: 404, description: 'Agency not found.' })
    async updateAgencyPlan(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateAgencyPlanDto: UpdateAgencyPlanDto,
    ) {
        return this.adminService.updateAgencyPlan(id, updateAgencyPlanDto);
    }
}
