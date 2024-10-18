import { GridRowsProp } from '@mui/x-data-grid';
import { getOperacionesIrregularidad, deleteOperacionIrregularidad, addOperacionIrregularidad } from './_requests';
import { OperacionIrregularidadModel } from './_models';

export const fetchOperacionesIrregularidad = async (
  page: number,
  pageSize: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<OperacionIrregularidadModel>>>,
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

    const response = await getOperacionesIrregularidad(page, pageSize, filterParams);
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
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<OperacionIrregularidadModel>>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    await deleteOperacionIrregularidad(id);
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    setError(null); // Limpiar cualquier error previo si la eliminación es exitosa
  } catch (error: any) {
    console.error("Error deleting centro de distribución", error);
    const message = error.message || 'Delete failed';
    setError(message);
  }
};

export const handleAddOperacionIrregularidad = async (
  currentOperacionIrregularidad: OperacionIrregularidadModel,
  fetchOperacionIrregularidadsData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentOperacionIrregularidad: React.Dispatch<React.SetStateAction<OperacionIrregularidadModel>>,
  initialOperacionIrregularidad: OperacionIrregularidadModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await addOperacionIrregularidad(currentOperacionIrregularidad);
    fetchOperacionIrregularidadsData(); // Recargar datos después de agregar
    setOpen(false);
    setCurrentOperacionIrregularidad(initialOperacionIrregularidad);
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
