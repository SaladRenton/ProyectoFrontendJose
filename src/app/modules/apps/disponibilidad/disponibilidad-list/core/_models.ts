

// Tipo para el transportista
export interface TransportistaModel {
  id?: number;
  razon_social: string;
  email: string;
  localidad: string;
  ciudad: string;
  calle: string;
  numero_calle: string;
  piso: string;
  dpto: string;
  tel: string;
  interno1?: string;
  cuit: string;
  // Agrega más campos según sea necesario
}



export const initialTransportista: TransportistaModel = {

  id: 0,
  razon_social: '',
  email: '',
  localidad: '',
  ciudad: '',
  calle: '',
  numero_calle: '',
  piso: '',
  dpto: '',
  tel: '',
  cuit: '',

}





