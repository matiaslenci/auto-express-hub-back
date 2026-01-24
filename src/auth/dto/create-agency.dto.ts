
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Plan } from 'src/database/agency.entity';

export class CreateAgencyDto {
  @ApiProperty({
    description: 'The subscription plan of the agency.',
    enum: Plan,
    example: Plan.BASICO,
  })
  @IsEnum(Plan)
  @IsNotEmpty()
  plan: Plan;

  @ApiProperty({
    description: 'The display name of the agency.',
    example: 'Autos Deluxe',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'The username of the agency (URL).',
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
}
