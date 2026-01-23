import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AgenciesService } from './agencies.service';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { Agency } from 'src/database/agency.entity';

@ApiTags('Agencies')
@Controller('agencies')
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  @Get(':username')
  @ApiOperation({ summary: 'Get agency public profile by username' })
  @ApiResponse({
    status: 200,
    description: 'Returns the agency data.',
  })
  @ApiResponse({ status: 404, description: 'Agency not found.' })
  async getAgencyByUsername(@Param('username') username: string) {
    return this.agenciesService.getAgencyByUsername(username);
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update own agency profile' })
  @ApiResponse({
    status: 200,
    description: 'The profile has been successfully updated.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Agency not found.' })
  async updateProfile(
    @GetUser() user: Agency,
    @Body() updateAgencyDto: UpdateAgencyDto,
  ) {
    return this.agenciesService.updateProfile(user.id, updateAgencyDto);
  }
}
