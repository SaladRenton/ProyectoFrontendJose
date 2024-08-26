import axios, { AxiosError } from "axios";
import { ViajeModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;





export const getViajes = (page: number, pageSize: number, filters: Record<string, string>, includes: string[]) => {

  const includeQuery = includes.length > 0 ? { include: includes.join(',') } : {};
  return axios.get(`${API_URL}/viajes`, {
    params: {
      page: page + 1,
      sort: '-id',
      per_page: pageSize,
      ...filters,
      ...includeQuery
    }
  });
};




// Otras funciones (updateviaje, deleteviaje, addviaje) permanecen igual





// Nuevo endpoint para actualizar un viaje
export const updateViaje = async (viaje: ViajeModel) => {
  try {
    const response = await axios.put(`${API_URL}/viajes/${viaje.id}`, viaje);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};


// Nuevo endpoint para eliminar un viaje
export const deleteViaje = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/viajes/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};


// Nuevo endpoint para agregar un viaje
export const addViaje = async (viaje: ViajeModel) => {
  try {
    const response = await axios.post(`${API_URL}/viajes`, viaje);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};


export const revertirLote = async (lote_viaje_id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/revertir-lote`, {
      data: { lote_viaje_id },
    });
    return response.data;
  } catch (error) {
    console.error("Error revirtiendo el lote", error);
    throw error;
  }
};

const buildQueryParams = (params: Record<string, string | boolean | number | string[]>): string => {
  return Object.entries(params)
    .map(([key, value]) => {
      if (key === 'persona_id_destino') {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`;
      }
      if (Array.isArray(value)) {
        return value.map(val => `filter[${encodeURIComponent(key)}][]=${encodeURIComponent(val)}`).join('&');
      }
      return `filter[${encodeURIComponent(key)}]=${encodeURIComponent(value)}`;
    })
    .join('&');
};

export const reasignarViajes = async (data: Record<string, string | boolean | number | string[]>) => {
  try {
    const queryParams = buildQueryParams(data);
    const response = await axios.get(`${API_URL}/viajes/reasignacion?${queryParams}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Error al reasignar los viajes.');
    } else {
      throw new Error('Error no manejado al reasignar los viajes.');
    }
  }
};

export const uploadFile = (file: File, operacion_id: number | boolean | string | string[]) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('operacion_id', operacion_id.toString());

  return axios.post(`${API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const asignarZonasRequest = (lote: number) => {
  return axios.post(`${API_URL}/viajes/asignar-zonas/${lote}`);
};


export const cambioMasivoEstadosRequest = async (filters: Record<string, string | boolean | number | string[]>,estado_id_destino: string) => { 


  const filterParams = Object.keys(filters).reduce((acc, key) => {
    acc[`filter[${key}]`] = filters[key].toString();
    return acc;
  }, {} as Record<string, string>);

  const response = await axios.get(`${API_URL}/viajes/cambiarEstados`, {
    params: {
      ...filterParams,
      estado_id_destino: estado_id_destino
   
    }
  });

  return response;

};

export const asignarTransportistasRequest = async (lote: number) => {
  return axios.post(`${API_URL}/viajes/asignar-transportistas/${lote}`);
};

// Función para verificar si el error es de tipo AxiosError
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

function isAxiosErrorWithMessage(error: unknown): error is AxiosError<{ message: string }> {
  return axios.isAxiosError(error) && error.response?.data && typeof error.response.data.message === 'string';
}


export const downloadCSV = async (loteViajeId: number, operacionId: string, zonaRepartoId: string[]) => {
  try {
    const response = await axios.get(`${API_URL}/viajes/export-csv`, {
      params: {
        'filter[lote_viaje_id]': loteViajeId,
        'filter[operacion_id]': operacionId,
        'filter[zona_reparto_id]': zonaRepartoId.join(','),
      },
      //responseType: 'blob', // Important to handle binary data
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `operacion_${operacionId}.csv`);
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



export const downloadViajesXlsx = async (filters: Record<string, string | boolean | number | string[]>) => { 



  try {

    const filterParams = Object.keys(filters).reduce((acc, key) => {
      acc[`filter[${key}]`] = filters[key].toString();
      return acc;
    }, {} as Record<string, string>);

    const response = await axios.get(`${API_URL}/exportar-viajes`, {
      params: {
        ...filterParams,
     
      },
      responseType: 'blob', // Important to handle binary data
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `viajes.xlsx`);
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

      throw new Error('Error descargando el XLSX');
    }
  }
};