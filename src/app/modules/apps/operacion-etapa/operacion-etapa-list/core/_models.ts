

export interface OperacionEtapaModel {
  id: number;
  etapa_id: number | string;
  operacion_id: number | string;
  orden: number;
  notificar: boolean;
  mostrar_tracking_web: boolean;
  // Agrega más campos según sea necesario
}



export const initialOperacionEtapa: OperacionEtapaModel = {

  id: 0,
  etapa_id: 0,
  operacion_id: 0,
  orden:1,
  notificar:true,
  mostrar_tracking_web:true


}





