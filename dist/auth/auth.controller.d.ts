import { AuthService } from './auth.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createAgencyDto: CreateAgencyDto): Promise<{
        access_token: string;
        agency: Omit<import("../database/agency.entity").Agency, "password">;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        agency: Omit<import("../database/agency.entity").Agency, "password">;
    }>;
}
