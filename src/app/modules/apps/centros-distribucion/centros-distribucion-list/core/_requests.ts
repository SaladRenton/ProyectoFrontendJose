import axios from "axios";
import {  CentroDistribucionModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;





export const getCentrosDistribucion = (page: number, pageSize: number, filters: Record<string, string>) => {
  return axios.get(`${API_URL}/centros-distribucion`, {
    params: {
      page:page +1,
      sort: 'id',
      per_page: pageSize,
      ...filters
    }
  });
};

// Otras funciones (updateTransportista, deleteTransportista, addTransportista) permanecen igual





// Nuevo endpoint para actualizar un transportista
export const updateCentroDistribucion= async (centro: CentroDistribucionModel) => {
  try {
    const response = await axios.put(`${API_URL}/centros-distribucion/${centro.id}`, centro);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};


// Nuevo endpoint para eliminar un transportista
export const deleteCentroDistribucion = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/centros-distribucion/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};


export const addCentroDistribucion = async (centro: CentroDistribucionModel) => {
  try {
    const response = await axios.post(`${API_URL}/centros-distribucion`, centro);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('Ocurrio un error inesperado');
  }
};