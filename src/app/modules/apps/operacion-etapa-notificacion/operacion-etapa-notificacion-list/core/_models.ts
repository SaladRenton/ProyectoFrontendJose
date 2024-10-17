

export interface OperacionEtapaNotificacionModel {
  id?: number;
  medio_contacto_id: number | string;
  operacion_etapa_id: number | string;
  mensaje: string;
  // Agrega más campos según sea necesario
}



export const initialOperacionEtapaNotificacion: OperacionEtapaNotificacionModel = {

  id: 0,
  medio_contacto_id: 0,
  operacion_etapa_id: 0,
  mensaje:''


}





