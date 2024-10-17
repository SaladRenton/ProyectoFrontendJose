import { GridRowsProp,GridRowModel } from '@mui/x-data-grid';
import { getOperacionesEtapaNotificacion, deleteOperacionEtapaNotificacion, addOperacionEtapaNotificacion,updateOperacionEtapaNotificacion } from './_requests';
import { OperacionEtapaNotificacionModel } from './_models';
import { OperacionEtapaModel } from '../../../operacion-etapa/operacion-etapa-list/core/_models';

export const fetchOperacionesEtapaNotificacion = async (
  page: number,
  pageSize: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<OperacionEtapaNotificacionModel>>>,
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

    const response = await getOperacionesEtapaNotificacion(page, pageSize, filterParams);
    setRows(response.data.data);
    setRowCount(response.data.total);
    setError(null); // Limpiar cualquier error previo
  } catch (error) {
    console.error("Error fetching Centros data", error);
    setError('Error fetching centros data');
  }
  setLoading(false);
};



export const handleDeleteRow = async (
  id: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<OperacionEtapaNotificacionModel>>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    await deleteOperacionEtapaNotificacion(id);
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    setError(null); // Limpiar cualquier error previo si la eliminación es exitosa
  } catch (error: any) {
    console.error("Error deleting centro de distribución", error);
    const message = error.message || 'Delete failed';
    setError(message);
  }
};

export const handleAddOperacionEtapaNotificacion = async (
  currentOperacionEtapaNotificacion: OperacionEtapaNotificacionModel,
  fetchOperacionEtapaNotificacionsData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentOperacionEtapaNotificacion: React.Dispatch<React.SetStateAction<OperacionEtapaNotificacionModel>>,
  initialOperacionEtapaNotificacion: OperacionEtapaNotificacionModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await addOperacionEtapaNotificacion(currentOperacionEtapaNotificacion);
    fetchOperacionEtapaNotificacionsData(); // Recargar datos después de agregar
    setOpen(false);
    setCurrentOperacionEtapaNotificacion(initialOperacionEtapaNotificacion);
    setError(null); // Limpiar cualquier error previo si la adición es exitosa
  } catch (error: any) {
    console.error("Error adding transportista", error);
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



export const handleEditEtapaNotificacion = async (
  currentOperacionEtapaNotificacion: OperacionEtapaNotificacionModel,
  fetchOperacionEtapaNotificacion: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentOperacionEtapaNotificacion: React.Dispatch<React.SetStateAction<OperacionEtapaNotificacionModel>>,
  initialOperacionEtapaNotificacion: OperacionEtapaNotificacionModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await updateOperacionEtapaNotificacion(currentOperacionEtapaNotificacion);
    fetchOperacionEtapaNotificacion(); // Recargar datos después de editar
    setOpen(false);
    setCurrentOperacionEtapaNotificacion(initialOperacionEtapaNotificacion);
    setError(null); // Limpiar cualquier error previo si la edición es exitosa
  } catch (error: any) {
    console.error("Error actualizando la notificación", error);
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

