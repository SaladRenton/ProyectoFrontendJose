import { OperacionModel } from "../../../viajes/viajes-list/core/_models";


// Tipo para el transportista
export interface FormFieldModel {


  form_id: number;
  name: string;
  type: string,
  visible_name: string;
  show_tms: boolean;
  required: boolean;
  orden: number;
  valor_default: string;
  show_form: boolean;

}

// Tipo para el transportista
export interface FormularioModel {
  id?: number;
  name: string;
  operacion_id: number;
  operacion?: OperacionModel
  form_field?: FormFieldModel



  // Agrega más campos según sea necesario
}



export const initialFormulario: FormularioModel = {

  id: 0,
  name: '',
  operacion_id: 0




}





