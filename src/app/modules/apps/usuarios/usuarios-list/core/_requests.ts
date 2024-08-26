import axios, { AxiosError } from "axios";
import { UserModel } from "../../../../auth";


const API_URL = import.meta.env.VITE_APP_API_URL;





export const getUsuarios = (page: number, pageSize: number, filters: Record<string, string>) => {
  return axios.get(`${API_URL}/users`, {
    params: {
      include: 'persona,roles',
      sort: '-id',
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

function isAxiosErrorWithMessage(error: unknown): error is AxiosError<{ message: string }> {
  return axios.isAxiosError(error) && error.response?.data && typeof error.response.data.message === 'string';
}








// Nuevo endpoint para actualizar un transportista
export const updateUsuario = async (usuario: UserModel) => {
  try {
    const response = await axios.put(`${API_URL}/users/${usuario.id}`, usuario);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};


// Nuevo endpoint para eliminar un transportista
export const deleteUsuario = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};


// Nuevo endpoint para agregar un transportista
export const addUsuario = async (usuario: UserModel) => {
  try {
    const response = await axios.post(`${API_URL}/users`, usuario);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw new Error('An unexpected error occurred');
  }
};