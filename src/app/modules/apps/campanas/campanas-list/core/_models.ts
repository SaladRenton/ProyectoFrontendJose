

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
  plantilla_email: string;
  envio_en_proceso: boolean;
  total_emails_enviados: number;
  fecha_limitada_agenda:boolean;
  limite_dias_cita:number;
  asunto_correo: string;
  waapi_api_token:string;
  waapi_instance_id:number;

 
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
  plantilla_email:'',
  envio_en_proceso:false,
  total_emails_enviados:0,
  fecha_limitada_agenda: false,
  limite_dias_cita:3,
  asunto_correo:''



}





