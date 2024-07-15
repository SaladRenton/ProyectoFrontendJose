import { GridRowModel, GridRowsProp } from '@mui/x-data-grid';
import { getZonas, updateZona, deleteZona } from './_requests';
import { ZonaModel } from './_models';

export const fetchZonas = async (
  page: number,
  pageSize: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<ZonaModel>>>,


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

    const response = await getZonas(page, pageSize, filterParams);
    setRows(response.data.data);
    setRowCount(response.data.total);
    setError(null); // Limpiar cualquier error previo
  } catch (error) {
    console.error("Error fetching zonas data", error);
    setError('Error fetching zonas data');
  }
  setLoading(false);
};

export const handleProcessRowUpdate = async (
  newRow: GridRowModel<ZonaModel>,
  oldRow: GridRowModel<ZonaModel>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
): Promise<GridRowModel<ZonaModel>> => {
  try {
    await updateZona(newRow as ZonaModel);
    setError(null); // Limpiar cualquier error previo si la actualización es exitosa
    return newRow;
  } catch (error: any) {
    console.error("Error updating Zona", error);
    const message = error.message || 'Update failed';
    setError(message);
    return oldRow; // Revertir a la fila anterior si hay un error
  }
};

export const handleDeleteRow = async (
  id: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<ZonaModel>>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    await deleteZona(id);
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    setError(null); // Limpiar cualquier error previo si la eliminación es exitosa
  } catch (error: any) {
    console.error("Error deleting Zona", error);
    const message = error.message || 'Delete failed';
    setError(message);
  }
};



export const handleEditZona = async (
  currentZona: ZonaModel,
  fetchZonasData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentZona: React.Dispatch<React.SetStateAction<ZonaModel>>,
  initialZona: ZonaModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await updateZona(currentZona);
    fetchZonasData(); // Recargar datos después de editar
    setOpen(false);
    setCurrentZona(initialZona);
    setError(null); // Limpiar cualquier error previo si la edición es exitosa
  } catch (error: any) {
    console.error("Error updating Zona", error);
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
