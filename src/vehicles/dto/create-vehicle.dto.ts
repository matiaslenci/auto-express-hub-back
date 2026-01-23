
import {
  IsString,
  IsInt,
  IsNumber,
  IsBoolean,
  IsArray,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({ description: 'The brand of the vehicle.', example: 'Toyota' })
  @IsString()
  @IsNotEmpty()
  marca: string;

  @ApiProperty({ description: 'The model of the vehicle.', example: 'Corolla' })
  @IsString()
  @IsNotEmpty()
  modelo: string;

  @ApiProperty({
    description: 'The manufacturing year of the vehicle.',
    example: 2022,
  })
  @IsInt()
  @IsNotEmpty()
  anio: number;

  @ApiProperty({
    description: 'The price of the vehicle.',
    example: 25000.0,
  })
  @IsNumber()
  @IsNotEmpty()
  precio: number;

  @ApiProperty({ description: 'The type of the vehicle.', example: 'Sedán' })
  @IsString()
  @IsNotEmpty()
  tipo: string;

  @ApiProperty({
    description: 'The transmission type of the vehicle.',
    example: 'Automática',
  })
  @IsString()
  @IsNotEmpty()
  transmision: string;

  @ApiProperty({
    description: 'The fuel type of the vehicle.',
    example: 'Gasolina',
  })
  @IsString()
  @IsNotEmpty()
  combustible: string;

  @ApiProperty({
    description: 'The kilometraje of the vehicle.',
    example: 15000,
  })
  @IsInt()
  @IsNotEmpty()
  kilometraje: number;

  @ApiProperty({ description: 'The color of the vehicle.', example: 'Rojo' })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({
    description: 'A description of the vehicle.',
    example: 'En excelente estado, único dueño.',
    required: false,
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({
    description: 'An array of URLs for the vehicle’s photos.',
    type: [String],
    example: [
      'https://example.com/photo1.jpg',
      'https://example.com/photo2.jpg',
    ],
  })
  @IsArray()
  @IsString({ each: true })
  fotos: string[];

  @ApiProperty({
    description: 'Indicates if the vehicle is available for sale.',
    default: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
