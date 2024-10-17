import { GridRowsProp , GridRowModel} from '@mui/x-data-grid';
import { getOperacionesEtapa, deleteOperacionEtapa, addOperacionEtapa,updateOperacionEtapa } from './_requests';
import { OperacionEtapaModel } from './_models';

export const fetchOperacionesEtapa = async (
  page: number,
  pageSize: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<OperacionEtapaModel>>>,
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

    const response = await getOperacionesEtapa(page, pageSize, filterParams);
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
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<OperacionEtapaModel>>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    await deleteOperacionEtapa(id);
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    setError(null); // Limpiar cualquier error previo si la eliminación es exitosa
  } catch (error: any) {
    console.error("Error deleting centro de distribución", error);
    const message = error.message || 'Delete failed';
    setError(message);
  }
};

export const handleAddOperacionEtapa = async (
  currentOperacionEtapa: OperacionEtapaModel,
  fetchOperacionEtapasData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentOperacionEtapa: React.Dispatch<React.SetStateAction<OperacionEtapaModel>>,
  initialOperacionEtapa: OperacionEtapaModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await addOperacionEtapa(currentOperacionEtapa);
    fetchOperacionEtapasData(); // Recargar datos después de agregar
    setOpen(false);
    setCurrentOperacionEtapa(initialOperacionEtapa);
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



interface ErrorResponse {
  errors: Record<string, string[]>;
}

export const handleProcessRowUpdate = async (
  newRow: GridRowModel<OperacionEtapaModel>,
  oldRow: GridRowModel<OperacionEtapaModel>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>
): Promise<GridRowModel<OperacionEtapaModel>> => {
  try {
    await updateOperacionEtapa(newRow as OperacionEtapaModel);
    setError(null); // Limpiar cualquier error previo si la actualización es exitosa
    setModalErrors([]); // Limpiar cualquier error previo si la actualización es exitosa
    return newRow;
  } catch (error: any) {
    console.error("Error updating viaje", error);
    const message = error.message || 'Update failed';
    setError(message);
    if (error.response && error.response.data && error.response.data.errors) {
      const errors = Object.entries(error.response.data.errors as ErrorResponse["errors"]).map(
        ([field, descriptions]) => {
          return `${field}: ${(descriptions as string[]).join(' ')}`;
        }
      );
      setModalErrors([message, ...errors]);
    } else {
      setModalErrors([message]);
    }
    return oldRow; // Revertir a la fila anterior si hay un error
  }
};
