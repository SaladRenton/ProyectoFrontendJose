

// Tipo para el transportista
export interface CampanaModel {
  id?: number;
  nombre: string;
  descripcion: string;
  total_campana_viajes: number;
  total_contact_attempts: number;
  activa: boolean;
  operacion_id?: number;
  zona_reparto_id?: string[];
  lote_viaje_id?: string;
 
  // Agrega más campos según sea necesario
}



export const initialCampana: CampanaModel = {

  id: 0,
  nombre: '',
  descripcion: '',
  activa: true,
  lote_viaje_id:'',
  total_campana_viajes: 0,
  total_contact_attempts: 0,

}





