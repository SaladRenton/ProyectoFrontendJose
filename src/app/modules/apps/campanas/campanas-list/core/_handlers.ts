import { GridRowModel,GridRowsProp } from '@mui/x-data-grid';
import { getCampanas, updateCampana, addCampana,downloadCSV } from './_requests';
import { CampanaModel } from './_models';

export const fetchCampanas = async (
  page: number,
  pageSize: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<CampanaModel>>>,
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

    const response = await getCampanas(page, pageSize, filterParams);
    setRows(response.data.data);
    setRowCount(response.data.total);
    setError(null); // Limpiar cualquier error previo
  } catch (error) {
    console.error("Error fetching campanas data", error);
    setError('Error fetching campanas data');
  }
  setLoading(false);
};

export const handleProcessRowUpdate = async (
  newRow: GridRowModel<CampanaModel>,
  oldRow: GridRowModel<CampanaModel>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
): Promise<GridRowModel<CampanaModel>> => {
  try {
    await updateCampana(newRow as CampanaModel);
    setError(null); // Limpiar cualquier error previo si la actualización es exitosa
    return newRow;
  } catch (error: any) {
    console.error("Error updating campana", error);
    const message = error.message || 'Update failed';
    setError(message);
    return oldRow; // Revertir a la fila anterior si hay un error
  }
};


export const handleAddCampana = async (
  currentCampana: CampanaModel,
  fetchCampanasData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentCampana: React.Dispatch<React.SetStateAction<CampanaModel>>,
  initialCampana: CampanaModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
   const response =  await addCampana(currentCampana);
    fetchCampanasData(); // Recargar datos después de agregar
    setOpen(false);
    setCurrentCampana(initialCampana);
    setError(null); // Limpiar cualquier error previo si la adición es exitosa
  } catch (error: any) {
    console.error("Error adding campana", error);
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

export const handleEditCampana = async (
  currentCampana: CampanaModel,
  fetchCampanasData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentCampana: React.Dispatch<React.SetStateAction<CampanaModel>>,
  initialCampana: CampanaModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await updateCampana(currentCampana);
    fetchCampanasData(); // Recargar datos después de editar
    setOpen(false);
    setCurrentCampana(initialCampana);
    setError(null); // Limpiar cualquier error previo si la edición es exitosa
  } catch (error: any) {
    console.error("Error updating campana", error);
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



export const handleDownloadCsv = async (
  campanaId: number,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
 
    await downloadCSV(campanaId);
    setError(null); // Limpiar cualquier error previo si la edición es exitosa
  } catch (error: any) {
    console.error("Error descargando el CSV", error);
    const message = "Error descargando el CSV " + error.message;
    setError(message);
   
  }
  setLoading(false);
};