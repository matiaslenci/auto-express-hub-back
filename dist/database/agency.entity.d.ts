import { Vehicle } from './vehicle.entity';
export declare enum Plan {
    GRATUITO = "gratuito",
    BASICO = "basico",
    PROFESIONAL = "profesional",
    PREMIUM = "premium"
}
export declare const PLAN_LIMITS: Record<Plan, number>;
export declare class Agency {
    id: string;
    username: string;
    email: string;
    password?: string;
    nombre: string;
    logo: string;
    portada: string;
    ubicacion: string;
    whatsapp?: string;
    plan: Plan;
    limitePublicaciones: number;
    createdAt: Date;
    updatedAt: Date;
    isAdmin: boolean;
    isActive: boolean;
    vehicles: Vehicle[];
}
