
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum Plan {
  BASICO = 'basico',
  PROFESIONAL = 'profesional',
  PREMIUM = 'premium',
}

// Límites de publicaciones por plan (-1 = sin límite)
export const PLAN_LIMITS: Record<Plan, number> = {
  [Plan.BASICO]: 10,
  [Plan.PROFESIONAL]: 50,
  [Plan.PREMIUM]: -1,
};

@Entity('agencies')
export class Agency {
  @ApiProperty({
    description: 'The unique identifier of the agency.',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The username of the agency, used for public profile URLs.',
    example: 'autos_deluxe',
    uniqueItems: true,
  })
  @Index({ unique: true })
  @Column({ type: 'varchar', unique: true })
  username: string;

  @ApiProperty({
    description: 'The email of the agency, used for login.',
    example: 'contact@autosdeluxe.com',
    uniqueItems: true,
  })
  @Index({ unique: true })
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', select: false })
  password?: string;

  @ApiProperty({
    description: 'The display name of the agency.',
    example: 'Autos Deluxe',
  })
  @Column({ type: 'varchar' })
  nombre: string;

  @ApiProperty({
    description: 'URL of the agency’s logo.',
    example: 'https://example.com/logo.png',
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  logo: string;

  @ApiProperty({
    description: 'URL of the agency’s cover image.',
    example: 'https://example.com/cover.png',
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  portada: string;

  @ApiProperty({
    description: 'The location of the agency.',
    example: '123 Main St, Anytown',
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  ubicacion: string;

  @ApiProperty({
    description: 'The WhatsApp number for the agency.',
    example: '+1234567890',
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  whatsapp?: string;

  @ApiProperty({
    description: 'The subscription plan of the agency.',
    enum: Plan,
    default: Plan.BASICO,
  })
  @Column({
    type: 'enum',
    enum: Plan,
    default: Plan.BASICO,
  })
  plan: Plan;

  @ApiProperty({
    description: 'The maximum number of publications allowed for the agency.',
    example: 10,
    default: 10,
  })
  @Column({ type: 'integer', default: 10 })
  limitePublicaciones: number;

  @ApiProperty({
    description: 'The date and time the agency was created.',
    type: 'string',
    format: 'date-time',
  })
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time the agency was last updated.',
    type: 'string',
    format: 'date-time',
  })
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @ApiProperty({
    description: 'Indicates if the agency is currently active (has paid for the month).',
    example: true,
    default: true,
  })
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.agency)
  vehicles: Vehicle[];
}
