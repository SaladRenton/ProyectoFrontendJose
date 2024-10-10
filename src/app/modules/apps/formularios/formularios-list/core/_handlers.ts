import { GridRowModel,GridRowsProp } from '@mui/x-data-grid';
import { getFormularios, addFormulario } from './_requests';
import { FormularioModel } from './_models';

export const fetchFormularios = async (
  page: number,
  pageSize: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<FormularioModel>>>,
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

    const response = await getFormularios(page, pageSize, filterParams);
    setRows(response.data.data);
    setRowCount(response.data.total);
    setError(null); // Limpiar cualquier error previo
  } catch (error) {
    console.error("Error fetching formularios data", error);
    setError('Error fetching formularios data');
  }
  setLoading(false);
};



export const handleAddFormulario = async (
  currentFormulario: FormularioModel,
  fetchFormulariosData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentFormulario: React.Dispatch<React.SetStateAction<FormularioModel>>,
  initialFormulario: FormularioModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
   const response =  await addFormulario(currentFormulario);
    fetchFormulariosData(); // Recargar datos después de agregar
    setOpen(false);
    setCurrentFormulario(initialFormulario);
    setError(null); // Limpiar cualquier error previo si la adición es exitosa
  } catch (error: any) {
    console.error("Error adding formulario", error);
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
