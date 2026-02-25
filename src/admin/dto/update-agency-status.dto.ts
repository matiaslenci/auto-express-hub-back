import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateAgencyStatusDto {
    @ApiProperty({
        description: 'Whether the agency is currently active or not. True means active, false means inactive.',
        example: true,
    })
    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;
}
