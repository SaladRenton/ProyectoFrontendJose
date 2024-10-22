import { ContactAttemptModel } from "../../../campanas-liquidaciones/campanas-liquidaciones-list/core/_models";
import { EstadoModel } from "../../../operaciones/operaciones-list/core/_models";


export interface OperacionCalificacionModel {
  id?: number; 
  operacion_id: number | string;
  contact_attempt_type_id: number | string;
  estado_destino?: EstadoModel;
  estado_id_destino: number | string;

  // Agrega más campos según sea necesario
}



export const initialOperacionCalificacion: OperacionCalificacionModel = {

  id: 0,
  estado_id_destino: 0,
  operacion_id: 0,
  contact_attempt_type_id: 0

}





