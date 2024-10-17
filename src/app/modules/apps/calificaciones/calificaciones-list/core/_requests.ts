import axios from "axios";
import {  CalificacionesModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;





export const getCalificaciones = (page: number, pageSize: number, filters: Record<string, string>) => {
  return axios.get(`${API_URL}/contact-attempts-types`, {
    params: {
      page:page +1,
      sort: '-id',
      per_page: pageSize,
      ...filters
    }
  });
};

// Otras funciones (updateTransportista, deleteTransportista, addTransportista) permanecen igual





// Nuevo endpoint para actualizar un transportista
export const updateCalificacion= async (centro: CalificacionesModel) => {
  try {
    const response = await axios.put(`${API_URL}/contact-attempts-types/${centro.id}`, centro);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};


// Nuevo endpoint para eliminar un transportista
export const deleteCalificacion = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/contact-attempts-types/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};


export const addCalificacion = async (centro: CalificacionesModel) => {
  try {
    const response = await axios.post(`${API_URL}/contact-attempts-types`, centro);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};