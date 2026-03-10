
import { IsEmail, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
    description: "Nombre de archivo del logo de la agencia.",
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11.webp',
    required: false,
  })
  @IsString({ message: 'El logo debe ser un nombre de archivo (cadena de texto)' })
  @IsOptional()
  logo?: string;

  @ApiProperty({
    description: "Nombre de archivo de la portada de la agencia.",
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11.webp',
    required: false,
  })
  @IsString({ message: 'La portada debe ser un nombre de archivo (cadena de texto)' })
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

  // NOTA: 'plan' y 'limitePublicaciones' NO están expuestos aquí
  // para prevenir escalación de privilegios. Solo un admin debería poder modificarlos.
}
