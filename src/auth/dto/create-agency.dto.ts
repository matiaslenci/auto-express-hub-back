
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Plan } from 'src/database/agency.entity';

export class CreateAgencyDto {
  @ApiProperty({
    description: 'The username of the agency.',
    example: 'autos_deluxe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The email of the agency.',
    example: 'contact@autosdeluxe.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password for the agency account.',
    example: 'Securep@ss123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'The display name of the agency.',
    example: 'Autos Deluxe',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'URL of the agency’s logo.',
    example: 'https://example.com/logo.png',
    required: false,
  })
  @IsString()
  @IsOptional()
  logo?: string;

  @ApiProperty({
    description: 'URL of the agency’s cover image.',
    example: 'https://example.com/cover.png',
    required: false,
  })
  @IsString()
  @IsOptional()
  portada?: string;

  @ApiProperty({
    description: 'The location of the agency.',
    example: '123 Main St, Anytown',
    required: false,
  })
  @IsString()
  @IsOptional()
  ubicacion?: string;

  @ApiProperty({
    description: 'The WhatsApp number for the agency.',
    example: '+1234567890',
  })
  @IsString()
  @IsNotEmpty()
  whatsapp: string;

  @ApiProperty({
    description: 'The subscription plan of the agency.',
    enum: Plan,
    default: Plan.BASICO,
    required: false,
  })
  @IsEnum(Plan)
  @IsOptional()
  plan?: Plan;
}
