
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Agency } from './agency.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('vehicles')
export class Vehicle {
  @ApiProperty({
    description: 'The unique identifier of the vehicle.',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The brand of the vehicle.', example: 'Toyota' })
  @Column({ type: 'varchar' })
  marca: string;

  @ApiProperty({ description: 'The model of the vehicle.', example: 'Corolla' })
  @Column({ type: 'varchar' })
  modelo: string;

  @ApiProperty({
    description: 'The manufacturing year of the vehicle.',
    example: 2022,
  })
  @Column({ type: 'integer' })
  anio: number;

  @ApiProperty({
    description: 'The price of the vehicle.',
    example: 25000.0,
    type: 'number',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @ApiProperty({ description: 'The type of the vehicle.', example: 'Sedán' })
  @Column({ type: 'varchar' })
  tipo: string;

  @ApiProperty({
    description: 'The transmission type of the vehicle.',
    example: 'Automática',
  })
  @Column({ type: 'varchar' })
  transmision: string;

  @ApiProperty({
    description: 'The fuel type of the vehicle.',
    example: 'Gasolina',
  })
  @Column({ type: 'varchar' })
  combustible: string;

  @ApiProperty({
    description: 'The kilometraje of the vehicle.',
    example: 15000,
  })
  @Column({ type: 'integer' })
  kilometraje: number;

  @ApiProperty({ description: 'The color of the vehicle.', example: 'Rojo' })
  @Column({ type: 'varchar' })
  color: string;

  @ApiProperty({
    description: 'A description of the vehicle.',
    example: 'En excelente estado, único dueño.',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @ApiProperty({
    description: 'An array of URLs for the vehicle’s photos.',
    type: [String],
    example: [
      'https://example.com/photo1.jpg',
      'https://example.com/photo2.jpg',
    ],
  })
  @Column({ type: 'text', array: true })
  fotos: string[];

  @ApiProperty({
    description: 'Indicates if the vehicle is available for sale.',
    default: true,
  })
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @ApiProperty({
    description: 'The number of times the vehicle has been viewed.',
    default: 0,
  })
  @Column({ type: 'integer', default: 0 })
  vistas: number;

  @ApiProperty({
    description: 'The number of times the WhatsApp link has been clicked.',
    default: 0,
  })
  @Column({ type: 'integer', default: 0 })
  clicksWhatsapp: number;

  @ApiProperty({
    description: 'The date and time the vehicle was created.',
    type: 'string',
    format: 'date-time',
  })
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Agency, (agency) => agency.vehicles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'agencyId' })
  agency: Agency;

  @ApiProperty({
    description: 'The ID of the agency that owns the vehicle.',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @Column()
  agencyId: string;
}
