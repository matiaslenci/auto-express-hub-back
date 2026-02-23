
import {
    Controller,
    Post,
    Get,
    Param,
    Query,
    UseGuards,
    HttpCode,
    HttpStatus,
    ParseIntPipe,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiQuery,
} from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { Agency } from '../database/agency.entity';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Post('vehicle/:id/view')
    @UseGuards(ThrottlerGuard)
    @Throttle({ default: { limit: 5, ttl: 60000 } })
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Register a vehicle view' })
    @ApiResponse({ status: 200, description: 'View registered successfully.' })
    async registerView(@Param('id') id: string) {
        return this.analyticsService.registerView(id);
    }

    @Post('vehicle/:id/whatsapp-click')
    @UseGuards(ThrottlerGuard)
    @Throttle({ default: { limit: 5, ttl: 60000 } })
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Register a WhatsApp click' })
    @ApiResponse({ status: 200, description: 'Click registered successfully.' })
    async registerWhatsAppClick(@Param('id') id: string) {
        return this.analyticsService.registerWhatsAppClick(id);
    }

    @Get('agency/summary')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get agency analytics summary' })
    @ApiResponse({ status: 200, description: 'Returns agency summary.' })
    async getAgencySummary(@GetUser() user: Agency) {
        return this.analyticsService.getAgencySummary(user.id);
    }

    @Get('vehicle/:id/stats')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get stats for a specific vehicle' })
    @ApiQuery({ name: 'days', required: false, type: Number })
    @ApiResponse({ status: 200, description: 'Returns vehicle stats.' })
    async getVehicleStats(
        @Param('id') id: string,
        @Query('days', new ParseIntPipe({ optional: true })) days?: number,
    ) {
        return this.analyticsService.getVehicleStats(id, days || 30);
    }
}
