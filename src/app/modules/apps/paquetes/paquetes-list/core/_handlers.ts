import { GridRowModel } from '@mui/x-data-grid';
import { getPaquetes, updatePaquete, deletePaquete, addPaquete } from './_requests';
import { PaqueteModel } from './_models';

export const fetchPaquetes = async (
  page: number,
  pageSize: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowModel<PaqueteModel>[]>>,
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

    const response = await getPaquetes(page, pageSize, filterParams);
    setRows(response.data.data);
    setRowCount(response.data.total);
    setError(null); // Limpiar cualquier error previo
  } catch (error) {
    console.error("Error fetching Paquetes data", error);
    setError('Error fetching Paquetes data');
  }
  setLoading(false);
};

export const handleProcessRowUpdate = async (
  newRow: GridRowModel<PaqueteModel>,
  oldRow: GridRowModel<PaqueteModel>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
): Promise<GridRowModel<PaqueteModel>> => {
  try {
    await updatePaquete(newRow as PaqueteModel);
    setError(null); // Limpiar cualquier error previo si la actualización es exitosa
    return newRow;
  } catch (error: any) {
    console.error("Error updating Paquete", error);
    const message = error.message || 'Update failed';
    setError(message);
    return oldRow; // Revertir a la fila anterior si hay un error
  }
};

export const handleDeleteRow = async (
  id: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowModel<PaqueteModel>[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    await deletePaquete(id);
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    setError(null); // Limpiar cualquier error previo si la eliminación es exitosa
  } catch (error: any) {
    console.error("Error deleting Paquete", error);
    const message = error.message || 'Delete failed';
    setError(message);
  }
};

export const handleAddPaquete = async (
  currentPaquete: PaqueteModel,
  fetchPaquetesData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentPaquete: React.Dispatch<React.SetStateAction<PaqueteModel>>,
  initialPaquete: PaqueteModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await addPaquete(currentPaquete);
    fetchPaquetesData(); // Recargar datos después de agregar
    setOpen(false);
    setCurrentPaquete(initialPaquete);
    setError(null); // Limpiar cualquier error previo si la adición es exitosa
  } catch (error: any) {
    console.error("Error adding Paquete", error);
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

export const handleEditPaquete = async (
  currentPaquete: PaqueteModel,
  fetchPaquetesData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentPaquete: React.Dispatch<React.SetStateAction<PaqueteModel>>,
  initialPaquete: PaqueteModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await updatePaquete(currentPaquete);
    fetchPaquetesData(); // Recargar datos después de editar
    setOpen(false);
    setCurrentPaquete(initialPaquete);
    setError(null); // Limpiar cualquier error previo si la edición es exitosa
  } catch (error: any) {
    console.error("Error updating Paquete", error);
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