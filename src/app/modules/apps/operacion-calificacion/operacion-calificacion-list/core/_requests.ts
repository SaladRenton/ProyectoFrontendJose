import axios from "axios";
import {  OperacionCalificacionModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;





export const getOperacionesCalificacion = (page: number, pageSize: number, filters: Record<string, string>) => {
  return axios.get(`${API_URL}/calificaciones-operacion`, {
    params: {
      page:page +1,
      sort: 'id',
      include:'estadoDestino,contactAttemptType',
      per_page: pageSize,
      ...filters
    }
  });
};

// Otras funciones (updateTransportista, deleteTransportista, addTransportista) permanecen igual








// Nuevo endpoint para eliminar un transportista
export const deleteOperacionCalificacion = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/calificaciones-operacion/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};


export const addOperacionCalificacion = async (operacioncalificacion: OperacionCalificacionModel) => {
  try {
    const response = await axios.post(`${API_URL}/calificaciones-operacion`, operacioncalificacion);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};