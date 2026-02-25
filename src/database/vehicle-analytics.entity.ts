
import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToOne,
    JoinColumn,
    Index,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('vehicle_analytics')
@Index(['vehicleId', 'date'], { unique: true })
export class VehicleAnalytics {
    @ApiProperty({
        description: 'The ID of the vehicle.',
        example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    })
    @PrimaryColumn('uuid')
    vehicleId: string;

    @ApiProperty({
        description: 'The date for the analytics summary.',
        example: '2024-02-23',
    })
    @PrimaryColumn('date')
    date: Date;

    @ApiProperty({
        description: 'The number of times the vehicle was viewed on this date.',
        default: 0,
    })
    @Column({ type: 'integer', default: 0 })
    viewsCount: number;

    @ApiProperty({
        description: 'The number of times the WhatsApp link was clicked on this date.',
        default: 0,
    })
    @Column({ type: 'integer', default: 0 })
    clicksCount: number;

    @ManyToOne(() => Vehicle, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'vehicleId' })
    vehicle: Vehicle;
}
