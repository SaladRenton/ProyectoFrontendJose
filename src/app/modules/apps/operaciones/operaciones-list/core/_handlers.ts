import { GridRowModel,GridRowsProp } from '@mui/x-data-grid';
import { getOperaciones } from './_requests';
import { OperacionesModel } from './_models';

export const fetchOperaciones = async (
  page: number,
  pageSize: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<OperacionesModel>>>,
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

    const response = await getOperaciones(page, pageSize, filterParams);
    setRows(response.data.data);
    setRowCount(response.data.total);
    setError(null); // Limpiar cualquier error previo
  } catch (error) {
    console.error("Error fetching Operaciones data", error);
    setError('Error fetching operaciones data');
  }
  setLoading(false);
};



export const handleDeleteRow = async (
  id: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowModel<OperacionesModel>[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    //await deleteOperacion(id);
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    setError(null); // Limpiar cualquier error previo si la eliminación es exitosa
  } catch (error: any) {
    console.error("Error deleting Operacion", error);
    const message = error.message || 'Delete failed';
    setError(message);
  }
};
