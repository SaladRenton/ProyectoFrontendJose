import axios from "axios";
import {  OperacionPersonaModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;





export const getOperacionesPersona = (page: number, pageSize: number, filters: Record<string, string>) => {
  return axios.get(`${API_URL}/operaciones-persona`, {
    params: {
      page:page +1,
      sort: 'id',
      include:'persona',
      per_page: pageSize,
      ...filters
    }
  });
};

// Otras funciones (updateTransportista, deleteTransportista, addTransportista) permanecen igual








// Nuevo endpoint para eliminar un transportista
export const deleteOperacionPersona = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/operaciones-persona/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};


export const addOperacionPersona = async (operacionpersona: OperacionPersonaModel) => {
  try {
    const response = await axios.post(`${API_URL}/operaciones/agregar-transportista`, operacionpersona);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};