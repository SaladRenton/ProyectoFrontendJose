import axios from "axios";
import {  OperacionIrregularidadModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;





export const getOperacionesIrregularidad = (page: number, pageSize: number, filters: Record<string, string>) => {
  return axios.get(`${API_URL}/irregularidades-operacion`, {
    params: {
      page:page +1,
      sort: 'id',
      include:'irregularidad,estado',
      per_page: pageSize,
      ...filters
    }
  });
};

// Otras funciones (updateTransportista, deleteTransportista, addTransportista) permanecen igual








// Nuevo endpoint para eliminar un transportista
export const deleteOperacionIrregularidad = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/irregularidades-operacion/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};


export const addOperacionIrregularidad = async (operacionirregularidad: OperacionIrregularidadModel) => {
  try {
    const response = await axios.post(`${API_URL}/irregularidades-operacion`, operacionirregularidad);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};