
import { IsEmail, IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Plan } from 'src/database/agency.entity';

export class UpdateAgencyDto {
  @ApiProperty({
    description: 'The new username of the agency.',
    example: 'new_autos_deluxe',
    required: false,
  })
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: 'The new email of the agency.',
    example: 'newcontact@autosdeluxe.com',
    required: false,
  })
  @IsEmail({}, { message: 'El email debe ser un correo válido' })
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'The new display name of the agency.',
    example: 'New Autos Deluxe',
    required: false,
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsOptional()
  nombre?: string;

  @ApiProperty({
    description: "The new URL of the agency's logo.",
    example: 'https://example.com/newlogo.png',
    required: false,
  })
  @IsString({ message: 'El logo debe ser una URL (cadena de texto)' })
  @IsOptional()
  logo?: string;

  @ApiProperty({
    description: "The new URL of the agency's cover image.",
    example: 'https://example.com/newcover.png',
    required: false,
  })
  @IsString({ message: 'La portada debe ser una URL (cadena de texto)' })
  @IsOptional()
  portada?: string;

  @ApiProperty({
    description: 'The new location of the agency.',
    example: '456 New Main St, Anytown',
    required: false,
  })
  @IsString({ message: 'La ubicación debe ser una cadena de texto' })
  @IsOptional()
  ubicacion?: string;

  @ApiProperty({
    description: 'The new WhatsApp number for the agency.',
    example: '+19876543210',
    required: false,
  })
  @IsString({ message: 'El WhatsApp debe ser una cadena de texto' })
  @IsOptional()
  whatsapp?: string;

  @ApiProperty({
    description: 'The new subscription plan of the agency.',
    enum: Plan,
    required: false,
  })
  @IsEnum(Plan, { message: 'El plan debe ser uno de los valores válidos' })
  @IsOptional()
  plan?: Plan;

  @ApiProperty({
    description: 'The maximum number of publications allowed for the agency.',
    example: 50,
    required: false,
  })
  @IsNumber({}, { message: 'El límite de publicaciones debe ser un número' })
  @IsOptional()
  limitePublicaciones?: number;
}
