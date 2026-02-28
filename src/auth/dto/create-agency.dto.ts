
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
  IsOptional,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Plan } from 'src/database/agency.entity';

export class CreateAgencyDto {
  @ApiProperty({
    description: 'The subscription plan of the agency.',
    enum: Plan,
    default: Plan.GRATUITO,
    required: false,
  })
  @IsEnum(Plan, { message: 'El plan debe ser uno de los valores válidos' })
  @IsOptional()
  plan?: Plan;

  @ApiProperty({
    description: 'The display name of the agency.',
    example: 'Autos Deluxe',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @ApiProperty({
    description: 'The username of the agency (URL).',
    example: 'autos_deluxe',
  })
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  username: string;

  @ApiProperty({
    description: 'The email of the agency.',
    example: 'contact@autosdeluxe.com',
  })
  @IsEmail({}, { message: 'El email debe ser un correo válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  @ApiProperty({
    description: 'The password for the agency account.',
    example: 'Securep@ss123',
  })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
    message: 'La contraseña debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&)',
  })
  password: string;
}
