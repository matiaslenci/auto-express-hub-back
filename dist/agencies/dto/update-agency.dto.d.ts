import { Plan } from 'src/database/agency.entity';
export declare class UpdateAgencyDto {
    username?: string;
    email?: string;
    nombre?: string;
    logo?: string;
    portada?: string;
    ubicacion?: string;
    whatsapp?: string;
    plan?: Plan;
    limitePublicaciones?: number;
}
