import axios from "axios";
import {  ViajeModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;





export const getViajes = (page: number, pageSize: number, filters: Record<string, string>,includes: string[]) => {

  const includeQuery = includes.length > 0 ? { include: includes.join(',') } : {};
  return axios.get(`${API_URL}/viajes`, {
    params: {
      page:page +1,
      per_page: pageSize,
      ...filters,
      ...includeQuery
    }
  });
};




// Otras funciones (updateviaje, deleteviaje, addviaje) permanecen igual





// Nuevo endpoint para actualizar un viaje
export const updateViaje = async (viaje: ViajeModel) => {
  try {
    const response = await axios.put(`${API_URL}/viajes/${viaje.id}`, viaje);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};


// Nuevo endpoint para eliminar un viaje
export const deleteViaje = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/viajes/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};


// Nuevo endpoint para agregar un viaje
export const addViaje = async (viaje: ViajeModel) => {
  try {
    const response = await axios.post(`${API_URL}/viajes`, viaje);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};


export const revertirLote = async (lote_viaje_id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/revertir-lote`, {
      data: { lote_viaje_id },
    });
    return response.data;
  } catch (error) {
    console.error("Error revirtiendo el lote", error);
    throw error;
  }
};


export const uploadFile = (file: File, operacion_id: number) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('operacion_id', operacion_id.toString());

  return axios.post(`${API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const asignarZonasRequest = (lote: number) => {
  return axios.post(`${API_URL}/viajes/asignar-zonas/${lote}`);
};