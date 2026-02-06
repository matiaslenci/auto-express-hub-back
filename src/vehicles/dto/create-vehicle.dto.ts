
import {
  IsString,
  IsInt,
  IsNumber,
  IsBoolean,
  IsArray,
  IsOptional,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { TipoMoneda } from '../../database/vehicle.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({ description: 'The brand of the vehicle.', example: 'Toyota' })
  @IsString({ message: 'La marca debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La marca es obligatoria' })
  marca: string;

  @ApiProperty({ description: 'The model of the vehicle.', example: 'Corolla' })
  @IsString({ message: 'El modelo debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El modelo es obligatorio' })
  modelo: string;

  @ApiProperty({
    description: 'The manufacturing year of the vehicle.',
    example: 2022,
  })
  @IsInt({ message: 'El año debe ser un número entero' })
  @IsNotEmpty({ message: 'El año es obligatorio' })
  anio: number;

  @ApiProperty({
    description: 'The price of the vehicle. Optional when moneda is CONSULTAR.',
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
  })
  @IsEnum(TipoMoneda, { message: 'La moneda debe ser un valor válido' })
  @IsNotEmpty({ message: 'La moneda es obligatoria' })
  moneda: TipoMoneda;

  @ApiProperty({ description: 'The type of the vehicle.', example: 'Sedán' })
  @IsString({ message: 'El tipo debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El tipo es obligatorio' })
  tipo: string;

  @ApiProperty({
    description: 'The transmission type of the vehicle.',
    example: 'Automática',
  })
  @IsString({ message: 'La transmisión debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La transmisión es obligatoria' })
  transmision: string;

  @ApiProperty({
    description: 'The fuel type of the vehicle.',
    example: 'Gasolina',
  })
  @IsString({ message: 'El combustible debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El combustible es obligatorio' })
  combustible: string;

  @ApiProperty({
    description: 'The kilometraje of the vehicle.',
    example: 15000,
  })
  @IsInt({ message: 'El kilometraje debe ser un número entero' })
  @IsNotEmpty({ message: 'El kilometraje es obligatorio' })
  kilometraje: number;

  @ApiProperty({ description: 'The color of the vehicle.', example: 'Rojo' })
  @IsString({ message: 'El color debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El color es obligatorio' })
  color: string;

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
  })
  @IsArray({ message: 'Las fotos deben ser un arreglo' })
  @IsString({ each: true, message: 'Cada foto debe ser una URL (cadena de texto)' })
  fotos: string[];

  @ApiProperty({
    description: 'Indicates if the vehicle is available for sale.',
    default: true,
    required: false,
  })
  @IsBoolean({ message: 'Activo debe ser un valor booleano' })
  @IsOptional()
  activo?: boolean;
}
