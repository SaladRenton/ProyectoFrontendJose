import { GridRowsProp } from '@mui/x-data-grid';
import { getContactAttempt,downloadCalificacionXlsx} from './_requests';
import { ContactAttemptModel } from './_models';

export const fetchContactAttempt = async (
  page: number,
  pageSize: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<ContactAttemptModel>>>,
  setRowCount: React.Dispatch<React.SetStateAction<number>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  filters: Record<string, string> // Añadido parámetro de filtros
) => {
  setLoading(true);
  try {
    const filterParams = Object.keys(filters).reduce((acc, key) => {
      acc[`filter[${key}]`] = filters[key];
      return acc;
    }, {} as Record<string, string>);

    const response = await getContactAttempt(page, pageSize, filterParams);
    setRows(response.data.data);
    setRowCount(response.data.total);
    setError(null); // Limpiar cualquier error previo
  } catch (error) {
    console.error("Error fetching Calificacion data", error);
    setError('Error fetching Calificacion data');
  }
  setLoading(false);
};


interface ErrorResponse {
  errors: Record<string, string[]>;
}


export const exportarCalificaciones = async (
  filters: Record<string, string | boolean | number | string[]>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setExportarCalificacionesErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>

) => {
  setLoading(true);
  //console.log("Descargando true");
  try {
    const response = await downloadCalificacionXlsx(filters);
    setError(null); // Limpiar cualquier error previo si la asignación es exitosa
    setExportarCalificacionesErrors([]); // Limpiar cualquier error previo si la asignación es exitosa
    setLoading(false);
    console.log("Descargando False");



  } catch (error: any) {


    const message = error.message || 'Exportando el XLSX';
    setError(message);
    if (error.response && error.response.data && error.response.data.errors) {
      const errors = Object.entries(error.response.data.errors as ErrorResponse["errors"]).map(
        ([field, descriptions]) => {
          return `${field}: ${(descriptions as string[]).join(' ')}`;
        }
      );
      setExportarCalificacionesErrors([message, ...errors]);
    } else {
      setExportarCalificacionesErrors([message]);
    }
  }
  setLoading(false);
};


