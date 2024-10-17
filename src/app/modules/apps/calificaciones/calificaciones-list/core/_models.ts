

export interface CalificacionesModel {
  id?: number;

  descripcion: string;
  codigo: string;
  codigo_crm: string;
  calificacion_crm: boolean;


  // Agrega más campos según sea necesario
}



export const initialCalificaciones: CalificacionesModel = {

  id: 0,
  descripcion: '',
  codigo:'',
  codigo_crm:'',
  calificacion_crm:true



}





