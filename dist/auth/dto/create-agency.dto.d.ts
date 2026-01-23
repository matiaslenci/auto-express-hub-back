import { Plan } from 'src/database/agency.entity';
export declare class CreateAgencyDto {
    username: string;
    email: string;
    password: string;
    nombre: string;
    logo?: string;
    portada?: string;
    ubicacion?: string;
    whatsapp: string;
    plan?: Plan;
}
