import { GridRowModel,GridRowsProp } from '@mui/x-data-grid';
import { getIrregularidades, updateIrregularidad, deleteIrregularidad, addIrregularidad } from './_requests';
import { IrregularidadesModel } from './_models';

export const fetchIrregularidades = async (
  page: number,
  pageSize: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<IrregularidadesModel>>>,
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

    const response = await getIrregularidades(page, pageSize, filterParams);
    setRows(response.data.data);
    setRowCount(response.data.total);
    setError(null); // Limpiar cualquier error previo
  } catch (error) {
    console.error("Error fetching Irregularidades data", error);
    setError('Error fetching irregularidades data');
  }
  setLoading(false);
};

export const handleProcessRowUpdate = async (
  newRow: GridRowModel<IrregularidadesModel>,
  oldRow: GridRowModel<IrregularidadesModel>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
): Promise<GridRowModel<IrregularidadesModel>> => {
  try {
    await updateIrregularidad(newRow as IrregularidadesModel);
    setError(null); // Limpiar cualquier error previo si la actualización es exitosa
    return newRow;
  } catch (error: any) {
    console.error("Error updating irregularidad", error);
    const message = error.message || 'Update failed';
    setError(message);
    return oldRow; // Revertir a la fila anterior si hay un error
  }
};

export const handleDeleteRow = async (
  id: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<IrregularidadesModel>>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    await deleteIrregularidad(id);
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    setError(null); // Limpiar cualquier error previo si la eliminación es exitosa
  } catch (error: any) {
    console.error("Error deleting irregularidad", error);
    const message = error.message || 'Delete failed';
    setError(message);
  }
};

export const handleAddIrregularidad = async (
  currentIrregularidad: IrregularidadesModel,
  fetchIrregularidadesData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentIrregularidad: React.Dispatch<React.SetStateAction<IrregularidadesModel>>,
  initialIrregularidad: IrregularidadesModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await addIrregularidad(currentIrregularidad);
    fetchIrregularidadesData(); // Recargar datos después de agregar
    setOpen(false);
    setCurrentIrregularidad(initialIrregularidad);
    setError(null); // Limpiar cualquier error previo si la adición es exitosa
  } catch (error: any) {
    console.error("Error adding irregularidad", error);
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

export const handleEditIrregularidad = async (
  currentIrregularidad: IrregularidadesModel,
  fetchIrregularidadesData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentIrregularidad: React.Dispatch<React.SetStateAction<IrregularidadesModel>>,
  initialIrregularidad: IrregularidadesModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await updateIrregularidad(currentIrregularidad);
    fetchIrregularidadesData(); // Recargar datos después de editar
    setOpen(false);
    setCurrentIrregularidad(initialIrregularidad);
    setError(null); // Limpiar cualquier error previo si la edición es exitosa
  } catch (error: any) {
    console.error("Error updating irregularidad", error);
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
