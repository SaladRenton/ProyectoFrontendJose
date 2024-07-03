import { OperacionModel } from "../../../viajes/viajes-list/core/_models";
import { TransportistaModel } from "../../../../auth";

export interface PaqueteModel {
  id?: number;
  descripcion: string | null;
  peso: number | null;
  created_at?: string; // ISO date string
  updated_at?: string; // ISO date string
  codigo_barra: string | null;
  numero_serie: string;
  mac: string | null;
  persona_id: number | null;
  cantidad: number;
  entregado?: boolean;
  operacion_id: number;
  lote_externo: string;
  lote_equipos_id: number;
  persona?: TransportistaModel | null; // Ajusta este tipo si tienes más detalles sobre el objeto persona
  operacion?: OperacionModel;
  lote_equipos?: {
    id: number;
    operacion_id: number;
    created_at?: string; // ISO date string
    updated_at?: string; // ISO date string
  };
}

export const initialPaquete: PaqueteModel = {
  id:0,
  descripcion: '',
  peso: null,
  codigo_barra: '',
  numero_serie: '',
  mac: '',
  persona_id: null,
  cantidad: 0,
  operacion_id: 0,
  lote_externo: '',
  lote_equipos_id: 0,

};
