
import {
  IsString,
  IsInt,
  IsNumber,
  IsBoolean,
  IsArray,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { TipoMoneda } from '../../database/vehicle.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVehicleDto {
  @ApiProperty({
    description: 'The brand of the vehicle.',
    example: 'Toyota',
    required: false,
  })
  @IsString({ message: 'La marca debe ser una cadena de texto' })
  @IsOptional()
  marca?: string;

  @ApiProperty({
    description: 'The model of the vehicle.',
    example: 'Corolla',
    required: false,
  })
  @IsString({ message: 'El modelo debe ser una cadena de texto' })
  @IsOptional()
  modelo?: string;

  @ApiProperty({
    description: 'The manufacturing year of the vehicle.',
    example: 2022,
    required: false,
  })
  @IsInt({ message: 'El año debe ser un número entero' })
  @IsOptional()
  anio?: number;

  @ApiProperty({
    description: 'The price of the vehicle.',
    example: 25000.0,
    required: false,
  })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  @IsOptional()
  precio?: number;

  @ApiProperty({
    description: 'Currency type: ARS (pesos argentinos), USD (dólares), or CONSULTAR (price on request).',
    enum: TipoMoneda,
    example: TipoMoneda.USD,
    required: false,
  })
  @IsEnum(TipoMoneda, { message: 'La moneda debe ser un valor válido' })
  @IsOptional()
  moneda?: TipoMoneda;

  @ApiProperty({
    description: 'The type of the vehicle.',
    example: 'Sedán',
    required: false,
  })
  @IsString({ message: 'El tipo debe ser una cadena de texto' })
  @IsOptional()
  tipo?: string;

  @ApiProperty({
    description: 'The transmission type of the vehicle.',
    example: 'Automática',
    required: false,
  })
  @IsString({ message: 'La transmisión debe ser una cadena de texto' })
  @IsOptional()
  transmision?: string;

  @ApiProperty({
    description: 'The fuel type of the vehicle.',
    example: 'Gasolina',
    required: false,
  })
  @IsString({ message: 'El combustible debe ser una cadena de texto' })
  @IsOptional()
  combustible?: string;

  @ApiProperty({
    description: 'The kilometraje of the vehicle.',
    example: 15000,
    required: false,
  })
  @IsInt({ message: 'El kilometraje debe ser un número entero' })
  @IsOptional()
  kilometraje?: number;

  @ApiProperty({
    description: 'The color of the vehicle.',
    example: 'Rojo',
    required: false,
  })
  @IsString({ message: 'El color debe ser una cadena de texto' })
  @IsOptional()
  color?: string;

  @ApiProperty({
    description: 'A description of the vehicle.',
    example: 'En excelente estado, único dueño.',
    required: false,
  })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsOptional()
  descripcion?: string;

  @ApiProperty({
    description: 'La localidad/ciudad donde se encuentra el vehículo.',
    example: 'Santa Fe',
    required: false,
  })
  @IsString({ message: 'La localidad debe ser una cadena de texto' })
  @IsOptional()
  localidad?: string;

  @ApiProperty({
    description: 'An array of URLs for the vehicle’s photos.',
    type: [String],
    example: [
      'https://example.com/photo1.jpg',
      'https://example.com/photo2.jpg',
    ],
    required: false,
  })
  @IsArray({ message: 'Las fotos deben ser un arreglo' })
  @IsString({ each: true, message: 'Cada foto debe ser una URL (cadena de texto)' })
  @IsOptional()
  fotos?: string[];

  @ApiProperty({
    description: 'Indicates if the vehicle is available for sale.',
    required: false,
  })
  @IsBoolean({ message: 'Activo debe ser un valor booleano' })
  @IsOptional()
  activo?: boolean;
}
