import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { Agency } from 'src/database/agency.entity';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new vehicle' })
  @ApiResponse({
    status: 201,
    description: 'The vehicle has been successfully created.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async createVehicle(
    @Body() createVehicleDto: CreateVehicleDto,
    @GetUser() user: Agency,
  ) {
    return this.vehiclesService.createVehicle(createVehicleDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all vehicles' })
  @ApiQuery({
    name: 'agencyId',
    required: false,
    description: 'Filter vehicles by agency ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all vehicles.',
  })
  async getVehicles(@Query('agencyId') agencyId?: string) {
    return this.vehiclesService.getVehicles(agencyId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a vehicle by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the vehicle data.',
  })
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  async getVehicleById(@Param('id') id: string) {
    return this.vehiclesService.getVehicleById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a vehicle' })
  @ApiResponse({
    status: 200,
    description: 'The vehicle has been successfully updated.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  async updateVehicle(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
    @GetUser() user: Agency,
  ) {
    return this.vehiclesService.updateVehicle(id, updateVehicleDto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a vehicle' })
  @ApiResponse({
    status: 204,
    description: 'The vehicle has been successfully deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  async deleteVehicle(@Param('id') id: string, @GetUser() user: Agency) {
    return this.vehiclesService.deleteVehicle(id, user);
  }

  @Post(':id/view')
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Increment vehicle view count' })
  @ApiResponse({
    status: 200,
    description: 'The view count has been successfully incremented.',
  })
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  async incrementView(@Param('id') id: string) {
    return this.vehiclesService.incrementView(id);
  }

  @Post(':id/whatsapp')
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Increment vehicle WhatsApp click count' })
  @ApiResponse({
    status: 200,
    description:
      'The WhatsApp click count has been successfully incremented.',
  })
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  async incrementWhatsAppClick(@Param('id') id: string) {
    return this.vehiclesService.incrementWhatsAppClick(id);
  }
}
