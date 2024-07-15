import { GridRowModel,GridRowsProp } from '@mui/x-data-grid';
import { getTransportistas, updateTransportista, deleteTransportista, addTransportista } from './_requests';
import { TransportistaModel } from './_models';

export const fetchTransportistas = async (
  page: number,
  pageSize: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<TransportistaModel>>>,
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

    const response = await getTransportistas(page, pageSize, filterParams);
    setRows(response.data.data);
    setRowCount(response.data.total);
    setError(null); // Limpiar cualquier error previo
  } catch (error) {
    console.error("Error fetching transportistas data", error);
    setError('Error fetching transportistas data');
  }
  setLoading(false);
};

export const handleProcessRowUpdate = async (
  newRow: GridRowModel<TransportistaModel>,
  oldRow: GridRowModel<TransportistaModel>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
): Promise<GridRowModel<TransportistaModel>> => {
  try {
    await updateTransportista(newRow as TransportistaModel);
    setError(null); // Limpiar cualquier error previo si la actualización es exitosa
    return newRow;
  } catch (error: any) {
    console.error("Error updating transportista", error);
    const message = error.message || 'Update failed';
    setError(message);
    return oldRow; // Revertir a la fila anterior si hay un error
  }
};

export const handleDeleteRow = async (
  id: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<TransportistaModel>>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    await deleteTransportista(id);
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    setError(null); // Limpiar cualquier error previo si la eliminación es exitosa
  } catch (error: any) {
    console.error("Error deleting transportista", error);
    const message = error.message || 'Delete failed';
    setError(message);
  }
};

export const handleAddTransportista = async (
  currentTransportista: TransportistaModel,
  fetchTransportistasData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentTransportista: React.Dispatch<React.SetStateAction<TransportistaModel>>,
  initialTransportista: TransportistaModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await addTransportista(currentTransportista);
    fetchTransportistasData(); // Recargar datos después de agregar
    setOpen(false);
    setCurrentTransportista(initialTransportista);
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

export const handleEditTransportista = async (
  currentTransportista: TransportistaModel,
  fetchTransportistasData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentTransportista: React.Dispatch<React.SetStateAction<TransportistaModel>>,
  initialTransportista: TransportistaModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await updateTransportista(currentTransportista);
    fetchTransportistasData(); // Recargar datos después de editar
    setOpen(false);
    setCurrentTransportista(initialTransportista);
    setError(null); // Limpiar cualquier error previo si la edición es exitosa
  } catch (error: any) {
    console.error("Error updating transportista", error);
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
