

export interface CentroDistribucionModel {
  id?: number;
  nombre: string;
  latitud: number;
  longitud: number;
  
  // Agrega más campos según sea necesario
}



export const initialCentroDistribucion: CentroDistribucionModel = {

  id: 0,
  nombre: '',
  latitud: 0,
  longitud: 0,


}





