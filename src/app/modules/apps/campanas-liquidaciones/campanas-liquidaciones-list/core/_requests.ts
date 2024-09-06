import axios, { AxiosError } from "axios";


const API_URL = import.meta.env.VITE_APP_API_URL;




export const getContactAttempt = (page: number, pageSize: number, filters: Record<string, string>) => {

   

  
  return axios.get(`${API_URL}/estado-contacto`, {
    params: {
      page: page + 1,
      include: 'medioContacto,type,campana',
      sort: 'id',
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


export const downloadCalificacionXlsx = async (filters: Record<string, string | boolean | number | string[]>) => {



  try {

    const filterParams = Object.keys(filters).reduce((acc, key) => {
      acc[`filter[${key}]`] = filters[key].toString();
      return acc;
    }, {} as Record<string, string>);

    const response = await axios.get(`${API_URL}/estado-contacto/export-xlsx`, {
      params: {
        ...filterParams,

      },
      responseType: 'blob', // Important to handle binary data
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `calificaciones.xlsx`);
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