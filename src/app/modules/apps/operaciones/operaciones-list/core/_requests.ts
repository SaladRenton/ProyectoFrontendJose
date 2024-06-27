import axios from "axios";
import { OperacionesModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;





export const getOperaciones = (page: number, pageSize: number, filters: Record<string, string>) => {
  return axios.get(`${API_URL}/operaciones`, {
    params: {
      page: page + 1,
      include: 'estadoInicial',
      per_page: pageSize,
      ...filters
    }
  });
};

export const getOperacion = (id: number) => {
  return axios.get(`${API_URL}/operaciones/${id}`);
};

// Otras funciones (updateTransportista, deleteTransportista, addTransportista) permanecen igual
export const fetchOperacionPersona = async (operacionId: number, page: number, pageSize: number) => {
  try {
    const response = await axios.get(`${API_URL}/operaciones-persona`, {
      params: { 'filter[operacion_id]': operacionId,
      page, 
      per_page: pageSize,
      include :'persona' }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching data');
  }
};

export const deleteOperacionPersona = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/operaciones-persona/${id}`);
  } catch (error) {
    throw new Error('Error deleting data');
  }
};




// Nuevo endpoint para actualizar un transportista
export const updateTransportista = async (transportista: OperacionesModel) => {
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
export const addTransportista = async (transportista: OperacionesModel) => {
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