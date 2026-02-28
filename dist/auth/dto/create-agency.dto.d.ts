import { Plan } from 'src/database/agency.entity';
export declare class CreateAgencyDto {
    plan?: Plan;
    nombre: string;
    username: string;
    email: string;
    password: string;
}
