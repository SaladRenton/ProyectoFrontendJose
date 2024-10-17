import axios, { AxiosError } from "axios";
import { PaqueteModel } from "./_models";


const API_URL = import.meta.env.VITE_APP_API_URL;





export const getPaquetes = (page: number, pageSize: number, filters: Record<string, string>) => {
  return axios.get(`${API_URL}/paquetes`, {
    params: {
      include: 'persona,operacion,loteEquipos,ultimoViaje',
      page: page + 1,
      per_page: pageSize,
      ...filters
    }
  });
};

// Otras funciones (updateTransportista, deleteTransportista, addTransportista) permanecen igual

// Función para verificar si el error es de tipo AxiosError
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

function isAxiosErrorWithMessage(error: unknown): error is AxiosError<{ message: string,error?:string }> {
  return axios.isAxiosError(error) && error.response?.data && typeof error.response.data.message === 'string';
}


export const revertirLotePaquete = async (lote_paquete_id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/revertir-lote-paquete`, {
      data: { lote_paquete_id },
    });
    return response.data;
  } catch (error) {

    if (isAxiosError(error) || isAxiosErrorWithMessage(error) && error.response && error.response.data) {
      if (isAxiosErrorWithMessage(error)) {
        const errorMessage = error.response?.data.message;
        throw new Error(errorMessage);
      }

    } else {

      throw new Error('Error no manejado al revertir el lote');
    }
  }
};



export const uploadFile = async  (file: File, operacion_id: number) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('operacion_id', operacion_id.toString());

  try {

    const response = await  axios.post(`${API_URL}/import/paquetes`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });


    return response;

  } catch (error: any) {
    
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message + ' ' + error.response.data.error || 'Error al importar los equipos.');
    } else {
      throw new Error('Error no manejado al importar los equipos.');
    }

    
  }

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
    throw new Error('Ocurrio un error inesperado');
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
    throw new Error('Ocurrio un error inesperado');
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
    throw new Error('Ocurrio un error inesperado');
  }
};