import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new agency' })
  @ApiResponse({
    status: 201,
    description: 'The agency has been successfully created and returns JWT token with agency data.',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          description: 'JWT access token',
        },
        agency: {
          type: 'object',
          description: 'Agency data (excluding password)',
        },
      },
    },
  })
  @ApiResponse({ status: 409, description: 'Username or email already exists.' })
  async register(@Body() createAgencyDto: CreateAgencyDto) {
    return this.authService.register(createAgencyDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log in as an agency' })
  @ApiResponse({
    status: 200,
    description: 'Returns a JWT access token and agency data.',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          description: 'JWT access token',
        },
        agency: {
          type: 'object',
          description: 'Agency data (excluding password)',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
