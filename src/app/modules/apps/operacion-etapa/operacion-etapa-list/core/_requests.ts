import axios from "axios";
import {  OperacionEtapaModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;





export const getOperacionesEtapa = (page: number, pageSize: number, filters: Record<string, string>) => {
  return axios.get(`${API_URL}/operaciones-etapa`, {
    params: {
      page:page +1,
      sort: 'id',
      include:'etapa',
      per_page: pageSize,
      ...filters
    }
  });
};

// Otras funciones (updateTransportista, deleteTransportista, addTransportista) permanecen igual








// Nuevo endpoint para eliminar un transportista
export const deleteOperacionEtapa = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/operaciones-etapa/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};


export const addOperacionEtapa = async (operacionetapa: OperacionEtapaModel) => {
  try {
    const response = await axios.post(`${API_URL}/operaciones/agregar-etapa`, operacionetapa);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};