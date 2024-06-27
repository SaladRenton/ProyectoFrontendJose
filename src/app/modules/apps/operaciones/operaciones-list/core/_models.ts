

// Tipo para el transportista
export interface OperacionesModel {
  id?: number;
  d_operacion: string;
  descripcion: string;
  estado_inicial_id: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  id_omnileads_campaign: number;
  requiere_documentos: boolean;
  requiere_equipos: boolean;
  estado_inicial?: EstadoModel
  
  // Agrega más campos según sea necesario
}





export const initialOperacion: OperacionesModel = {
  id:0,
  d_operacion: '',
  descripcion: '',
  estado_inicial_id: 0,
  fecha_inicio: new Date(), // Fecha actual
  fecha_fin: new Date(), // Fecha actual
  id_omnileads_campaign: 0,
  requiere_documentos: true,
  requiere_equipos: true,

}


export interface EstadoModel {
  id?: number;
  d_estado: string,
  descripcion: string
}






