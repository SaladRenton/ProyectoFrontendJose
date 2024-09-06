




// Interface para el objeto "medio_contacto"
interface MedioContacto {
  id: number;
  nombre: string;
  created_at: string | null;  // Puede ser una fecha en formato ISO o null
  updated_at: string | null;  // Puede ser una fecha en formato ISO o null
}

// Interface para el objeto "type"
interface Type {
  id: number;
  descripcion: string;
  codigo: string;
  codigo_crm: string;
  created_at: string | null;  // Puede ser una fecha en formato ISO o null
  updated_at: string | null;  // Puede ser una fecha en formato ISO o null
  estado_id_destino: number | null;
}

// Interface principal que contiene los demás objetos
export interface ContactAttemptModel {
  id?: number;
  viaje_id: number;
  medio_contacto_id: number;
  fecha_contacto: string;  // Fecha en formato ISO (ej: "2024-07-29T16:43:11.000000Z")
  exitoso: boolean;
  created_at: string | null;  // Fecha en formato ISO o null
  updated_at: string | null;  // Fecha en formato ISO o null
  call_id: number | null;
  agent_id: number | null;
  agent_username: string | null;
  agent_name: string | null;
  telefono: string | null;
  id_contacto: number | null;
  rec_filename: string | null;
  form: any | null;  // Tipo desconocido, ajustable según la estructura
  type_id: number;
  form_id: number | null;
  latitud: number | null;
  longitud: number | null;
  irregularidad_id: number | null;
  observacion: string | null;
  user_id: number | null;
  campana_id: number | null;
  medio_contacto: MedioContacto;  // Relación con MedioContacto
  type: Type;  // Relación con Type
}






