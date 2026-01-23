
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'The email of the agency for login.',
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
  password: string;
}
