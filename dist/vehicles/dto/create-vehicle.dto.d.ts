import { TipoMoneda, TipoVehiculo } from '../../database/vehicle.entity';
export declare class CreateVehicleDto {
    marca: string;
    tipoVehiculo: TipoVehiculo;
    modelo: string;
    anio: number;
    precio?: number;
    moneda: TipoMoneda;
    tipo: string;
    transmision: string;
    combustible: string;
    kilometraje: number;
    color: string;
    descripcion?: string;
    localidad?: string;
    fotos: string[];
    activo?: boolean;
}
