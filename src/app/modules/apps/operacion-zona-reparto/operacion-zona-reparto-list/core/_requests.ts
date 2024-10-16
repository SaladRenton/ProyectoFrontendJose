import axios from "axios";
import {  OperacionZonaRepartoModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;





export const getOperacionesZonaReparto = (page: number, pageSize: number, filters: Record<string, string>) => {
  return axios.get(`${API_URL}/operacion-zona-reparto`, {
    params: {
      page:page +1,
      sort: 'zonas_reparto.codigo_zona',
      include:'zonaReparto',
      per_page: pageSize,
      ...filters
    }
  });
};

// Otras funciones (updateTransportista, deleteTransportista, addTransportista) permanecen igual








// Nuevo endpoint para eliminar un transportista
export const deleteOperacionZonaReparto = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/operacion-zona-reparto/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};


export const addOperacionZonaReparto = async (operacionZonaReparto: OperacionZonaRepartoModel) => {
  try {
    const response = await axios.post(`${API_URL}/operaciones/agregar-zona`, operacionZonaReparto);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};