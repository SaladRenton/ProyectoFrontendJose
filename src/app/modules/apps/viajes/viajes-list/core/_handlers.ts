import { GridRowModel } from '@mui/x-data-grid';
import { getViajes, updateViaje, deleteViaje, addViaje } from './_requests';
import { ViajeModel,includesConfig } from './_models';

export const fetchViajes = async (
  page: number,
  pageSize: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowModel<ViajeModel>[]>>,
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

    const response = await getViajes(page, pageSize, filterParams, includesConfig.viajes);
    setRows(response.data.data);
    setRowCount(response.data.total);
    setError(null); // Limpiar cualquier error previo
  } catch (error) {
    console.error("Error fetching Viajes data", error);
    setError('Error fetching Viajes data');
  }
  setLoading(false);
};

export const handleProcessRowUpdate = async (
  newRow: GridRowModel<ViajeModel>,
  oldRow: GridRowModel<ViajeModel>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
): Promise<GridRowModel<ViajeModel>> => {
  try {
    await updateViaje(newRow as ViajeModel);
    setError(null); // Limpiar cualquier error previo si la actualización es exitosa
    return newRow;
  } catch (error: any) {
    console.error("Error updating Viaje", error);
    const message = error.message || 'Update failed';
    setError(message);
    return oldRow; // Revertir a la fila anterior si hay un error
  }
};

export const handleDeleteRow = async (
  id: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowModel<ViajeModel>[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    await deleteViaje(id);
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    setError(null); // Limpiar cualquier error previo si la eliminación es exitosa
  } catch (error: any) {
    console.error("Error deleting Viaje", error);
    const message = error.message || 'Delete failed';
    setError(message);
  }
};

export const handleAddViaje = async (
  currentViaje: ViajeModel,
  fetchViajesData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentViaje: React.Dispatch<React.SetStateAction<ViajeModel>>,
  initialViaje: ViajeModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await addViaje(currentViaje);
    fetchViajesData(); // Recargar datos después de agregar
    setOpen(false);
    setCurrentViaje(initialViaje);
    setError(null); // Limpiar cualquier error previo si la adición es exitosa
  } catch (error: any) {
    console.error("Error adding Viaje", error);
    const message = error.message || 'Add failed';
    setError(message);
    if (error.response && error.response.data && error.response.data.errors) {
      const errors = Object.values(error.response.data.errors).flat();
      setModalErrors(errors);
    } else {
      setModalErrors([message]);
    }
  }
  setModalLoading(false);
};

export const handleEditViaje = async (
  currentViaje: ViajeModel,
  fetchViajesData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentViaje: React.Dispatch<React.SetStateAction<ViajeModel>>,
  initialViaje: ViajeModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await updateViaje(currentViaje);
    fetchViajesData(); // Recargar datos después de editar
    setOpen(false);
    setCurrentViaje(initialViaje);
    setError(null); // Limpiar cualquier error previo si la edición es exitosa
  } catch (error: any) {
    console.error("Error updating Viaje", error);
    const message = error.message || 'Update failed';
    setError(message);
    if (error.response && error.response.data && error.response.data.errors) {
      const errors = Object.values(error.response.data.errors).flat();
      setModalErrors(errors);
    } else {
      setModalErrors([message]);
    }
  }
  setModalLoading(false);
};
