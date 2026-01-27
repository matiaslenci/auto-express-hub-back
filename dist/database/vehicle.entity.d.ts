import { Agency } from './agency.entity';
export declare enum TipoMoneda {
    ARS = "ARS",
    USD = "USD",
    CONSULTAR = "CONSULTAR"
}
export declare class Vehicle {
    id: string;
    marca: string;
    modelo: string;
    anio: number;
    precio: number | null;
    moneda: TipoMoneda;
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
