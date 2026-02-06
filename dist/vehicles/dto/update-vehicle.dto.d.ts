import { TipoMoneda } from '../../database/vehicle.entity';
export declare class UpdateVehicleDto {
    marca?: string;
    modelo?: string;
    anio?: number;
    precio?: number;
    moneda?: TipoMoneda;
    tipo?: string;
    transmision?: string;
    combustible?: string;
    kilometraje?: number;
    color?: string;
    descripcion?: string;
    localidad?: string;
    fotos?: string[];
    activo?: boolean;
}
