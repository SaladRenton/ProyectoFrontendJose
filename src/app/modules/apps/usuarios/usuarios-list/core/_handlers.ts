import { GridRowModel ,GridRowsProp} from '@mui/x-data-grid';
import { getUsuarios, updateUsuario, deleteUsuario, addUsuario } from './_requests';
import { UserModel, UserModelWithRol } from '../../../../auth';

export const fetchUsuarios = async (
  page: number,
  pageSize: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<UserModelWithRol>>>,
  setRowCount: React.Dispatch<React.SetStateAction<number>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  filters: Record<string, string | boolean | number | string[]> // Añadido parámetro de filtros
) => {
  setLoading(true);
  try {
    const filterParams = Object.keys(filters).reduce((acc, key) => {
      acc[`filter[${key}]`] = String(filters[key]);
      return acc;
    }, {} as Record<string, string>);

    const response = await getUsuarios(page, pageSize, filterParams);
    setRows(response.data.data);
    setRowCount(response.data.total);
    setError(null); // Limpiar cualquier error previo
  } catch (error) {
    console.error("Error fetching Usuarios data", error);
    setError('Error fetching Usuarios data');
  }
  setLoading(false);
};

export const handleProcessRowUpdate = async (
  newRow: GridRowModel<UserModelWithRol>,
  oldRow: GridRowModel<UserModelWithRol>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
): Promise<GridRowModel<UserModelWithRol>> => {
  try {
    await updateUsuario(newRow as UserModelWithRol);
    setError(null); // Limpiar cualquier error previo si la actualización es exitosa
    return newRow;
  } catch (error: any) {
    console.error("Error updating Usario", error);
    const message = error.message || 'Update failed';
    setError(message);
    return oldRow; // Revertir a la fila anterior si hay un error
  }
};

export const handleDeleteRow = async (
  id: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<UserModelWithRol>>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    await deleteUsuario(id);
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    setError(null); // Limpiar cualquier error previo si la eliminación es exitosa
  } catch (error: any) {
    console.error("Error deleting Paquete", error);
    const message = error.message || 'Delete failed';
    setError(message);
  }
};

export const handleAddUsuario = async (
  currentUsuario: UserModelWithRol,
  fetchPaquetesData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentUsuario: React.Dispatch<React.SetStateAction<UserModelWithRol>>,
  initialUsuario: UserModelWithRol,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await addUsuario(currentUsuario);
    fetchPaquetesData(); // Recargar datos después de agregar
    setOpen(false);
    setCurrentUsuario(initialUsuario);
    setError(null); // Limpiar cualquier error previo si la adición es exitosa
  } catch (error: any) {
    console.error("Error adding Paquete", error);
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

export const handleEditUsuario = async (
  currentUsuario: UserModel,
  fetchUsuariosData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentUsuario: React.Dispatch<React.SetStateAction<UserModelWithRol>>,
  initialUsuario: UserModelWithRol,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await updateUsuario(currentUsuario);
    fetchUsuariosData(); // Recargar datos después de editar
    setOpen(false);
    setCurrentUsuario(initialUsuario);
    setError(null); // Limpiar cualquier error previo si la edición es exitosa
  } catch (error: any) {
    console.error("Error updating Paquete", error);
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
