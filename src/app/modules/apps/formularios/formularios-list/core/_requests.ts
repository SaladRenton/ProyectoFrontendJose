import axios, { AxiosError } from "axios";
import { FormularioModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;





export const getFormularios = (page: number, pageSize: number, filters: Record<string, string>) => {
  return axios.get(`${API_URL}/formularios`, {
    params: {
      include: 'operacion',
      page: page + 1,
      sort: 'id',
      per_page: pageSize,
      ...filters
    }
  });
};

// Otras funciones (updateTransportista, deleteTransportista, addTransportista) permanecen igual










// Nuevo endpoint para agregar un transportista
export const addFormulario = async (formulario: FormularioModel) => {
  try {
    const response = await axios.post(`${API_URL}/formularios`, formulario);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};

