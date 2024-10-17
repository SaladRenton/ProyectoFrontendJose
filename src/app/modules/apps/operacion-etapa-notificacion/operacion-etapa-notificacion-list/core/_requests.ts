import axios from "axios";
import {  OperacionEtapaNotificacionModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;





export const getOperacionesEtapaNotificacion = (page: number, pageSize: number, filters: Record<string, string>) => {
  return axios.get(`${API_URL}/operaciones-etapa-notificacion`, {
    params: {
      page:page +1,
      sort: 'id',
      include:'medioContacto',
      per_page: pageSize,
      ...filters
    }
  });
};

// Otras funciones (updateTransportista, deleteTransportista, addTransportista) permanecen igual








// Nuevo endpoint para eliminar un transportista
export const deleteOperacionEtapaNotificacion = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/operaciones-etapa-notificacion/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};


export const addOperacionEtapaNotificacion = async (operacionetapanotificacion: OperacionEtapaNotificacionModel) => {
  try {
    const response = await axios.post(`${API_URL}/operaciones/etapa/agregar-notificacion`, operacionetapanotificacion);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};



export const updateOperacionEtapaNotificacion = async (operacionetapanotificacion: OperacionEtapaNotificacionModel) => {
  try {
    const response = await axios.put(`${API_URL}/operaciones/etapa/notificacion/${operacionetapanotificacion.id}`, operacionetapanotificacion);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};