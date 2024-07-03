import axios from "axios";
import { PaqueteModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;





export const getPaquetes = (page: number, pageSize: number, filters: Record<string, string>) => {
  return axios.get(`${API_URL}/paquetes`, {
    params: {
      include: 'persona,operacion,loteEquipos',
      page: page + 1,
      per_page: pageSize,
      ...filters
    }
  });
};

// Otras funciones (updateTransportista, deleteTransportista, addTransportista) permanecen igual

export const revertirLotePaquete = async (lote_paquete_id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/revertir-lote-paquete`, {
      data: { lote_paquete_id },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
   
      throw error.response.data;
    }

    throw new Error('An unexpected error occurred');
  }
};




export const uploadFile = (file: File, operacion_id: number) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('operacion_id', operacion_id.toString());

  return axios.post(`${API_URL}/import/paquetes`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};





// Nuevo endpoint para actualizar un transportista
export const updatePaquete = async (paquete: PaqueteModel) => {
  try {
    const response = await axios.put(`${API_URL}/paquetes/${paquete.id}`, paquete);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};


// Nuevo endpoint para eliminar un transportista
export const deletePaquete = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/paquetes/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};


// Nuevo endpoint para agregar un transportista
export const addPaquete = async (paquete: PaqueteModel) => {
  try {
    const response = await axios.post(`${API_URL}/paquetes`, paquete);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};