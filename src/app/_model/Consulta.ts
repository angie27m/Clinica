import { Medico } from './Medico';
import { DetalleConsulta } from './DetalleConsulta';
export class Consulta {
    id: number;
    medico: Medico;
    fecha: string;
    detalleConsulta: DetalleConsulta[];
}