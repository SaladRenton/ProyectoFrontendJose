import axios from "axios";
import {  OperacionEstadoOrigenDestinoModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;





export const getOperacionesEstadoOrigenDestino = (page: number, pageSize: number, filters: Record<string, string>) => {
  return axios.get(`${API_URL}/estados-habilitados`, {
    params: {
      page:page +1,
      sort: 'id',
      include:'estadoOrigen,estadoDestino,contactAttemptType',
      per_page: pageSize,
      ...filters
    }
  });
};

// Otras funciones (updateTransportista, deleteTransportista, addTransportista) permanecen igual








// Nuevo endpoint para eliminar un transportista
export const deleteOperacionEstadoOrigenDestino = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/estados-habilitados/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};


export const addOperacionEstadoOrigenDestino = async (operacionestadoorigendestino: OperacionEstadoOrigenDestinoModel) => {
  try {
    const response = await axios.post(`${API_URL}/estados-habilitados`, operacionestadoorigendestino);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};