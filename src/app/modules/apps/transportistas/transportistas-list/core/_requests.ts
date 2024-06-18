import axios from "axios";
import {  TransportistaModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;





export const getTransportistas = (page: number, pageSize: number, filters: Record<string, string>) => {
  return axios.get(`${API_URL}/transportistas`, {
    params: {
      page:page +1,
      per_page: pageSize,
      ...filters
    }
  });
};

// Otras funciones (updateTransportista, deleteTransportista, addTransportista) permanecen igual





// Nuevo endpoint para actualizar un transportista
export const updateTransportista = async (transportista: TransportistaModel) => {
  try {
    const response = await axios.put(`${API_URL}/transportistas/${transportista.id}`, transportista);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};


// Nuevo endpoint para eliminar un transportista
export const deleteTransportista = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/transportistas/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};


// Nuevo endpoint para agregar un transportista
export const addTransportista = async (transportista: TransportistaModel) => {
  try {
    const response = await axios.post(`${API_URL}/transportistas`, transportista);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};