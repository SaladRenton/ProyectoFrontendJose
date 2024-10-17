import axios from "axios";
import {  IrregularidadesModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;





export const getIrregularidades = (page: number, pageSize: number, filters: Record<string, string>) => {
  return axios.get(`${API_URL}/irregularidades`, {
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
export const updateIrregularidad= async (centro: IrregularidadesModel) => {
  try {
    const response = await axios.put(`${API_URL}/irregularidades/${centro.id}`, centro);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};


// Nuevo endpoint para eliminar un transportista
export const deleteIrregularidad = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/irregularidades/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};


export const addIrregularidad = async (centro: IrregularidadesModel) => {
  try {
    const response = await axios.post(`${API_URL}/irregularidades`, centro);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};