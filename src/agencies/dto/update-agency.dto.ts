
import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Plan } from 'src/database/agency.entity';

export class UpdateAgencyDto {
  @ApiProperty({
    description: 'The new username of the agency.',
    example: 'new_autos_deluxe',
    required: false,
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: 'The new email of the agency.',
    example: 'newcontact@autosdeluxe.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'The new display name of the agency.',
    example: 'New Autos Deluxe',
    required: false,
  })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({
    description: 'The new URL of the agency’s logo.',
    example: 'https://example.com/newlogo.png',
    required: false,
  })
  @IsString()
  @IsOptional()
  logo?: string;

  @ApiProperty({
    description: 'The new URL of the agency’s cover image.',
    example: 'https://example.com/newcover.png',
    required: false,
  })
  @IsString()
  @IsOptional()
  portada?: string;

  @ApiProperty({
    description: 'The new location of the agency.',
    example: '456 New Main St, Anytown',
    required: false,
  })
  @IsString()
  @IsOptional()
  ubicacion?: string;

  @ApiProperty({
    description: 'The new WhatsApp number for the agency.',
    example: '+19876543210',
    required: false,
  })
  @IsString()
  @IsOptional()
  whatsapp?: string;

  @ApiProperty({
    description: 'The new subscription plan of the agency.',
    enum: Plan,
    required: false,
  })
  @IsEnum(Plan)
  @IsOptional()
  plan?: Plan;
}
