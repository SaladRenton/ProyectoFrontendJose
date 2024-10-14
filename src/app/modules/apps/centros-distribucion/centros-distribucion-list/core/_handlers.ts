import { GridRowModel,GridRowsProp } from '@mui/x-data-grid';
import { getCentrosDistribucion, updateCentroDistribucion, deleteCentroDistribucion, addCentroDistribucion } from './_requests';
import { CentroDistribucionModel } from './_models';

export const fetchCentrosDistribucion = async (
  page: number,
  pageSize: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<CentroDistribucionModel>>>,
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

    const response = await getCentrosDistribucion(page, pageSize, filterParams);
    setRows(response.data.data);
    setRowCount(response.data.total);
    setError(null); // Limpiar cualquier error previo
  } catch (error) {
    console.error("Error fetching Centros data", error);
    setError('Error fetching centros data');
  }
  setLoading(false);
};

export const handleProcessRowUpdate = async (
  newRow: GridRowModel<CentroDistribucionModel>,
  oldRow: GridRowModel<CentroDistribucionModel>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
): Promise<GridRowModel<CentroDistribucionModel>> => {
  try {
    await updateCentroDistribucion(newRow as CentroDistribucionModel);
    setError(null); // Limpiar cualquier error previo si la actualización es exitosa
    return newRow;
  } catch (error: any) {
    console.error("Error updating centro de distribución", error);
    const message = error.message || 'Update failed';
    setError(message);
    return oldRow; // Revertir a la fila anterior si hay un error
  }
};

export const handleDeleteRow = async (
  id: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<CentroDistribucionModel>>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    await deleteCentroDistribucion(id);
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    setError(null); // Limpiar cualquier error previo si la eliminación es exitosa
  } catch (error: any) {
    console.error("Error deleting centro de distribución", error);
    const message = error.message || 'Delete failed';
    setError(message);
  }
};

export const handleAddCentroDistribucion = async (
  currentCentroDistribucion: CentroDistribucionModel,
  fetchCentroDistribucionsData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentCentroDistribucion: React.Dispatch<React.SetStateAction<CentroDistribucionModel>>,
  initialCentroDistribucion: CentroDistribucionModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await addCentroDistribucion(currentCentroDistribucion);
    fetchCentroDistribucionsData(); // Recargar datos después de agregar
    setOpen(false);
    setCurrentCentroDistribucion(initialCentroDistribucion);
    setError(null); // Limpiar cualquier error previo si la adición es exitosa
  } catch (error: any) {
    console.error("Error adding centro de distribución", error);
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

export const handleEditCentroDistribucion = async (
  currentCentroDistribucion: CentroDistribucionModel,
  fetchCentroDistribucionsData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentCentroDistribucion: React.Dispatch<React.SetStateAction<CentroDistribucionModel>>,
  initialCentroDistribucion: CentroDistribucionModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await updateCentroDistribucion(currentCentroDistribucion);
    fetchCentroDistribucionsData(); // Recargar datos después de editar
    setOpen(false);
    setCurrentCentroDistribucion(initialCentroDistribucion);
    setError(null); // Limpiar cualquier error previo si la edición es exitosa
  } catch (error: any) {
    console.error("Error updating centro de distribución", error);
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
