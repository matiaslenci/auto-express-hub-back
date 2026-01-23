import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Agency } from 'src/database/agency.entity';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly agencyRepository;
    private readonly jwtService;
    private readonly configService;
    constructor(agencyRepository: Repository<Agency>, jwtService: JwtService, configService: ConfigService);
    register(createAgencyDto: CreateAgencyDto): Promise<{
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
    }>;
}
