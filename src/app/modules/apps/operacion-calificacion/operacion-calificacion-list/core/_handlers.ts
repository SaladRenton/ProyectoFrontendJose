import { GridRowsProp } from '@mui/x-data-grid';
import { getOperacionesCalificacion, deleteOperacionCalificacion, addOperacionCalificacion } from './_requests';
import { OperacionCalificacionModel } from './_models';

export const fetchOperacionesCalificacion = async (
  page: number,
  pageSize: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<OperacionCalificacionModel>>>,
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

    const response = await getOperacionesCalificacion(page, pageSize, filterParams);
    setRows(response.data.data);
    setRowCount(response.data.total);
    setError(null); // Limpiar cualquier error previo
  } catch (error) {
    console.error("Error fetching calificación data", error);
    setError('Error fetching calificación data');
  }
  setLoading(false);
};



export const handleDeleteRow = async (
  id: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<OperacionCalificacionModel>>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    await deleteOperacionCalificacion(id);
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    setError(null); // Limpiar cualquier error previo si la eliminación es exitosa
  } catch (error: any) {
    console.error("Error borrando  calificación", error);
    const message = error.message || 'Delete failed';
    setError(message);
  }
};

export const handleAddOperacionCalificacion = async (
  currentOperacionCalificacion: OperacionCalificacionModel,
  fetchOperacionCalificacionsData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentOperacionCalificacion: React.Dispatch<React.SetStateAction<OperacionCalificacionModel>>,
  initialOperacionCalificacion: OperacionCalificacionModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await addOperacionCalificacion(currentOperacionCalificacion);
    fetchOperacionCalificacionsData(); // Recargar datos después de agregar
    setOpen(false);
    setCurrentOperacionCalificacion(initialOperacionCalificacion);
    setError(null); // Limpiar cualquier error previo si la adición es exitosa
  } catch (error: any) {
    console.error("Error agregando la calificación", error);
    const message = error.message || 'Add failed';
    setError(message);
    if (error.response && error.response.data && error.response.data.errors) {
      const errors = Object.values(error.response.data.errors).flat().map(String);      
      setModalErrors(errors);
    } else {
      setModalErrors([message]);
    }
  }
  setModalLoading(false);
};
