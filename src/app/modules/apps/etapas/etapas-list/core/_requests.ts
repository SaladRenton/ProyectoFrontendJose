import axios from "axios";
import {  EtapasModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;





export const getEtapas = (page: number, pageSize: number, filters: Record<string, string>) => {
  return axios.get(`${API_URL}/etapas`, {
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
export const updateEtapa= async (centro: EtapasModel) => {
  try {
    const response = await axios.put(`${API_URL}/etapas/${centro.id}`, centro);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};


// Nuevo endpoint para eliminar un transportista
export const deleteEtapa = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/etapas/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};


export const addEtapa = async (centro: EtapasModel) => {
  try {
    const response = await axios.post(`${API_URL}/etapas`, centro);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};