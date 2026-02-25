import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Plan } from '../../database/agency.entity';

export class UpdateAgencyPlanDto {
    @ApiProperty({
        description: 'The subscription plan of the agency.',
        enum: Plan,
        example: Plan.PROFESIONAL,
    })
    @IsEnum(Plan)
    @IsNotEmpty()
    plan: Plan;
}
