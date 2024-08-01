import { ZonaModel } from "../../../zonas/zonas-list/core/_models";



export const includesConfig = {
  viajes: ['operacion','zonaReparto','persona','estadoActual','paquetes','validacion'] // Añadir cualquier otro include necesario aquí
};


export interface OperacionModel {
  id: number;
  created_at: Date | null;
  updated_at: Date | null;
  d_operacion: string;
  descripcion: string | null;
  activo: number;
  deleted_at: Date | null;
  estado_inicial_id: number;
}

export interface ValidacionModel {
  id: number;
  viaje_id: number;
  documento: string;
  nombre_apellido: string;
  firma: string; // Assuming this is a base64 string of the image
  created_at: string;
  updated_at: string;
}


// Tipo para el Viaje
export interface ViajeModel {
	          id?: number,
            operacion_id: number,
            fecha_inicio: Date,
            fecha_fin: Date,
            estado_actual_id: number,
            fecha_creacion: Date,
            latitud: number,
            longitud: number,
            email: string,
            nombre: string,
            apellido: string,
            id_identificacion_externo: number,
            direccion: string,
            created_at: Date,
            updated_at: Date,
            persona_id: number,
            user_id: number,
            calle: string,
            numero: string,
            piso_dpto: string,
            entre_calle_1: string,
            entre_calle_2: string,
            codigo_postal: string,
            partido: string,
            localidad: string,
            id_localidad: number,
            telefono: string,
            whatsapp: string,
            cantidad: number,
            id_identificador_cliente_externo: number,
            lote_viaje_id: number,
            zona_reparto_id: number,
            contacto_exitoso: boolean,
            operacion?: OperacionModel; // Nuevo campo para la relación con OperacionModel
            zona_reparto?:ZonaModel
            validacion?: ValidacionModel

}




export const initialViaje: ViajeModel = {
  id: 0,
  operacion_id: 0,
  fecha_inicio: new Date(),
  fecha_fin: new Date(),
  estado_actual_id: 0,
  fecha_creacion: new Date(),
  latitud: -34.6037, // Latitud de Buenos Aires
  longitud: -58.3816, // Longitud de Buenos Aires
  email: '',
  nombre: '',
  apellido: '',
  id_identificacion_externo: 0,
  direccion: '',
  created_at: new Date(),
  updated_at: new Date(),
  persona_id: 0,
  user_id: 0,
  calle: '',
  numero: '',
  piso_dpto: '',
  entre_calle_1: '',
  entre_calle_2: '',
  codigo_postal: '',
  partido: '',
  localidad: '',
  id_localidad: 0,
  telefono: '',
  whatsapp: '',
  cantidad: 0,
  id_identificador_cliente_externo: 0,
  lote_viaje_id: 0,
  zona_reparto_id: 0,
  contacto_exitoso: false,
  operacion: undefined
};





