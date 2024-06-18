import axios from "axios";
import {  ZonaModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;





export const getZonas = (page: number, pageSize: number, filters: Record<string, string>) => {
  return axios.get(`${API_URL}/zonas-reparto`, {
    params: {
      page:page +1,
      per_page: pageSize,
      ...filters
    }
  });
};






// Nuevo endpoint para actualizar un Zona
export const updateZona = async (zona: ZonaModel) => {
  try {
    const response = await axios.put(`${API_URL}/zonas-reparto/${zona.id}`, zona);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};


// Nuevo endpoint para eliminar un Zona
export const deleteZona = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/zonas-reparto/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};
