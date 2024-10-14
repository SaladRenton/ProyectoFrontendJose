import axios, { AxiosError } from "axios";
import { CampanaModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;





export const getCampanas = (page: number, pageSize: number, filters: Record<string, string>) => {
  return axios.get(`${API_URL}/campanas`, {
    params: {
      include: 'operacion,form',
      page: page + 1,
      sort: '-id',
      per_page: pageSize,
      ...filters
    }
  });
};

// Otras funciones (updateTransportista, deleteTransportista, addTransportista) permanecen igual





// Nuevo endpoint para actualizar un transportista
export const updateCampana = async (campana: CampanaModel) => {
  try {
    const response = await axios.put(`${API_URL}/campanas/${campana.id}`, campana);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};


// Nuevo endpoint para actualizar un transportista
export const enviarMasivo = async (campanaId: number) => {
  try {
    const response = await axios.post(`${API_URL}/campanas/${campanaId}/enviar-correos`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};


// Nuevo endpoint para actualizar un transportista
export const enviarWhatsappMasivo = async (campanaId: number) => {
  try {
    const response = await axios.post(`${API_URL}/campanas/${campanaId}/enviar-whatsapp`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};








// Nuevo endpoint para agregar un transportista
export const addCampana = async (campana: CampanaModel) => {
  try {
    const response = await axios.post(`${API_URL}/campanas`, campana);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};

// Función para verificar si el error es de tipo AxiosError
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

function isAxiosErrorWithMessage(error: unknown): error is AxiosError<{ message: string }> {
  return axios.isAxiosError(error) && error.response?.data && typeof error.response.data.message === 'string';
}

export const downloadCSV = async (campanaId: number) => {
  try {
    const response = await axios.get(`${API_URL}/campanas/export-csv`, {
      params: {
        'campana_id': campanaId,

      },
      //responseType: 'blob', // Important to handle binary data
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `campana_contactos_${campanaId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {

    if (isAxiosError(error) || isAxiosErrorWithMessage(error) && error.response && error.response.data) {
      if (isAxiosErrorWithMessage(error)) {
        const errorMessage = error.response?.data.message;
        throw new Error(errorMessage);
      }

    } else {

      throw new Error('Error descargando el CSV');
    }
  }




};
