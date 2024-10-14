import { GridRowModel,GridRowsProp } from '@mui/x-data-grid';
import { getEtapas, updateEtapa, deleteEtapa, addEtapa } from './_requests';
import { EtapasModel } from './_models';

export const fetchEtapas = async (
  page: number,
  pageSize: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<EtapasModel>>>,
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

    const response = await getEtapas(page, pageSize, filterParams);
    setRows(response.data.data);
    setRowCount(response.data.total);
    setError(null); // Limpiar cualquier error previo
  } catch (error) {
    console.error("Error fetching Etapas data", error);
    setError('Error fetching etapas data');
  }
  setLoading(false);
};

export const handleProcessRowUpdate = async (
  newRow: GridRowModel<EtapasModel>,
  oldRow: GridRowModel<EtapasModel>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
): Promise<GridRowModel<EtapasModel>> => {
  try {
    await updateEtapa(newRow as EtapasModel);
    setError(null); // Limpiar cualquier error previo si la actualización es exitosa
    return newRow;
  } catch (error: any) {
    console.error("Error updating etapa", error);
    const message = error.message || 'Update failed';
    setError(message);
    return oldRow; // Revertir a la fila anterior si hay un error
  }
};

export const handleDeleteRow = async (
  id: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<EtapasModel>>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    await deleteEtapa(id);
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    setError(null); // Limpiar cualquier error previo si la eliminación es exitosa
  } catch (error: any) {
    console.error("Error deleting etapa", error);
    const message = error.message || 'Delete failed';
    setError(message);
  }
};

export const handleAddEtapa = async (
  currentEtapa: EtapasModel,
  fetchEtapasData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentEtapa: React.Dispatch<React.SetStateAction<EtapasModel>>,
  initialEtapa: EtapasModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await addEtapa(currentEtapa);
    fetchEtapasData(); // Recargar datos después de agregar
    setOpen(false);
    setCurrentEtapa(initialEtapa);
    setError(null); // Limpiar cualquier error previo si la adición es exitosa
  } catch (error: any) {
    console.error("Error adding etapa", error);
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

export const handleEditEtapa = async (
  currentEtapa: EtapasModel,
  fetchEtapasData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentEtapa: React.Dispatch<React.SetStateAction<EtapasModel>>,
  initialEtapa: EtapasModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await updateEtapa(currentEtapa);
    fetchEtapasData(); // Recargar datos después de editar
    setOpen(false);
    setCurrentEtapa(initialEtapa);
    setError(null); // Limpiar cualquier error previo si la edición es exitosa
  } catch (error: any) {
    console.error("Error updating etapa", error);
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
