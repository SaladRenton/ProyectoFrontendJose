

export interface OperacionIrregularidadModel {
  id?: number;
  irregularidad_id: number | string;
  operacion_id: number | string;
  estado_id: number | string;
  // Agrega más campos según sea necesario
}



export const initialOperacionIrregularidad: OperacionIrregularidadModel = {

  id: 0,
  irregularidad_id: 0,
  operacion_id: 0,
  estado_id: 0,
}





