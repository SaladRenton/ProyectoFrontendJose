import axios from "axios";
import { AuthModel, UserModel,TransportistaModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const LOGIN_URL = `${API_URL}/login`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    email,
    password,
  });
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}

export function getUserByToken(token: string) {
  console.log(token);
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    access_token: token,
  });
}

export function getTransportistas(page: number, pageSize: number) {
  console.log("pagina"+page);
  return axios.get(`${API_URL}/transportistas`, {

    params: {
      page: page + 1, // Laravel paginación empieza en 1
      per_page: pageSize
    }
  });
}





// Nuevo endpoint para actualizar un transportista
export const updateTransportista = async (transportista: TransportistaModel) => {
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
export const addTransportista = async (transportista: TransportistaModel) => {
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