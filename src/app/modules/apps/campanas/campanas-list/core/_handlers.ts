import { GridRowModel, GridRowsProp } from '@mui/x-data-grid';
import { getCampanas, updateCampana, addCampana, downloadCSV, enviarMasivo, enviarWhatsappMasivo } from './_requests';
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
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>,
  file: File | null // Añadido el parámetro de archivo
) => {
  setModalLoading(true);
  try {
    let dataToSend: any = currentCampana;

    // Si hay un archivo cargado, usar FormData
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      // Agregar los datos del formulario a FormData
      Object.keys(currentCampana).forEach((key) => {
        const value = (currentCampana as any)[key];
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      dataToSend = formData;
    }

    const response = await addCampana(dataToSend); // Envía los datos o el FormData
    setModalLoading(false);

     // Verificar el tipo de contenido
     const contentType = response.headers['content-type'];

     

     if (contentType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
       // Si es un archivo Excel, lo descargamos
       const blob = new Blob([response.data], { type: contentType });
       const url = window.URL.createObjectURL(blob);
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', 'asignacion_campana_contactos.xlsx'); // Nombre del archivo
       document.body.appendChild(link);
       link.click();
       link.remove();
       setModalErrors(['Error: La campaña se creó pero existen errores. Revise el archivo descargado para analizarlos. Puede cerrar la ventana si desea'])
     
     } else if (contentType === 'application/json') {

      console.log(response);
       // Si es JSON, lo parseamos y retornamos el mensaje
       const text = await response.data; // Leer la respuesta como texto
      // const jsonResponse = JSON.parse(text); // Parsear a JSON
       fetchCampanasData(); // Recargar datos después de agregar
       setOpen(false);
       setCurrentCampana(initialCampana);
       setError(null); // Limpiar cualquier error previo si la adición es exitosa
       return text || 'Operación realizada exitosamente';
     } else {
       // Manejar otros tipos de respuestas si es necesario
       throw new Error('Error: Tipo de respuesta desconocido');
     }

   
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




export const handleEnviarMasivo = async (
  campanaId: number,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {

    await enviarMasivo(campanaId);
    setError(null); // Limpiar cualquier error previo si la edición es exitosa
    setLoading(false);
    return 1;
  } catch (error: any) {
    console.error("Error en el envio masivo", error);
    const message = "Error en el envio masivo " + error.message;
    setError(message);
    setLoading(false);
    return 0;

  }

};


export const handleEnviarWhatsappMasivo = async (
  campanaId: number,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {

    await enviarWhatsappMasivo(campanaId);
    setError(null); // Limpiar cualquier error previo si la edición es exitosa
    setLoading(false);
    return 1;
  } catch (error: any) {
    console.error("Error en el envio masivo", error);
    const message = "Error en el envio masivo " + error.message;
    setError(message);
    setLoading(false);
    return 0;

  }
 
};