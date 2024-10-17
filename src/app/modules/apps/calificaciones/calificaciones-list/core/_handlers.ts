import { GridRowModel,GridRowsProp } from '@mui/x-data-grid';
import { getCalificaciones, updateCalificacion, deleteCalificacion, addCalificacion } from './_requests';
import { CalificacionesModel } from './_models';

export const fetchCalificaciones = async (
  page: number,
  pageSize: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<CalificacionesModel>>>,
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

    const response = await getCalificaciones(page, pageSize, filterParams);
    setRows(response.data.data);
    setRowCount(response.data.total);
    setError(null); // Limpiar cualquier error previo
  } catch (error) {
    console.error("Error fetching Calificaciones data", error);
    setError('Error fetching calificaciones data');
  }
  setLoading(false);
};

export const handleProcessRowUpdate = async (
  newRow: GridRowModel<CalificacionesModel>,
  oldRow: GridRowModel<CalificacionesModel>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
): Promise<GridRowModel<CalificacionesModel>> => {
  try {
    await updateCalificacion(newRow as CalificacionesModel);
    setError(null); // Limpiar cualquier error previo si la actualización es exitosa
    return newRow;
  } catch (error: any) {
    console.error("Error updating calificacion", error);
    const message = error.message || 'Update failed';
    setError(message);
    return oldRow; // Revertir a la fila anterior si hay un error
  }
};

export const handleDeleteRow = async (
  id: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<CalificacionesModel>>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    await deleteCalificacion(id);
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    setError(null); // Limpiar cualquier error previo si la eliminación es exitosa
  } catch (error: any) {
    console.error("Error deleting calificacion", error);
    const message = error.message || 'Delete failed';
    setError(message);
  }
};

export const handleAddCalificacion = async (
  currentCalificacion: CalificacionesModel,
  fetchCalificacionesData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentCalificacion: React.Dispatch<React.SetStateAction<CalificacionesModel>>,
  initialCalificacion: CalificacionesModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await addCalificacion(currentCalificacion);
    fetchCalificacionesData(); // Recargar datos después de agregar
    setOpen(false);
    setCurrentCalificacion(initialCalificacion);
    setError(null); // Limpiar cualquier error previo si la adición es exitosa
  } catch (error: any) {
    console.error("Error adding calificacion", error);
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

export const handleEditCalificacion = async (
  currentCalificacion: CalificacionesModel,
  fetchCalificacionesData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentCalificacion: React.Dispatch<React.SetStateAction<CalificacionesModel>>,
  initialCalificacion: CalificacionesModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await updateCalificacion(currentCalificacion);
    fetchCalificacionesData(); // Recargar datos después de editar
    setOpen(false);
    setCurrentCalificacion(initialCalificacion);
    setError(null); // Limpiar cualquier error previo si la edición es exitosa
  } catch (error: any) {
    console.error("Error updating calificacion", error);
    const message = error.message || 'Update failed';
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
