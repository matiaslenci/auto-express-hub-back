import { Agency } from './agency.entity';
export declare class Vehicle {
    id: string;
    marca: string;
    modelo: string;
    anio: number;
    precio: number;
    tipo: string;
    transmision: string;
    combustible: string;
    kilometraje: number;
    color: string;
    descripcion: string;
    fotos: string[];
    activo: boolean;
    vistas: number;
    clicksWhatsapp: number;
    createdAt: Date;
    agency: Agency;
    agencyId: string;
}
