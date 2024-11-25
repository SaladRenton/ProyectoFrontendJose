import { GridRowModel, GridRowsProp } from '@mui/x-data-grid';
import { ViajeModel, includesConfig } from './_models';
import { getViajes, updateViaje, deleteViaje, addViaje, revertirLote as revertirLoteRequest, uploadFile, asignarZonasRequest, asignarTransportistasRequest, downloadViajesXlsx, cambioMasivoEstadosRequest, asignacionMasterViaje, cambioMasivoEstadosConsultaRequest } from './_requests';

export const fetchViajes = async (
  page: number,
  pageSize: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<ViajeModel>>>,
  setRowCount: React.Dispatch<React.SetStateAction<number>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  filters: Record<string, string | boolean | number | string[]>,
  includes: string[] = []
) => {
  setLoading(true);
  try {

    const filterParams = Object.keys(filters).reduce((acc, key) => {
      // Solo agregamos filtros que no sean null o undefined
      if (filters[key] !== null && filters[key] !== undefined) {
        acc[`filter[${key}]`] = filters[key].toString();
      }
      return acc;
    }, {} as Record<string, string>);


    const response = await getViajes(page, pageSize, filterParams, includesConfig.viajes);
    setRows(response.data.data);
    setRowCount(response.data.total);
    setError(null); // Limpiar cualquier error previo
  } catch (error) {
    console.error("Error fetching viajes data", error);
    setError('Error fetching viajes data');
  }
  setLoading(false);
};

interface ErrorResponse {
  errors: Record<string, string[]>;
}

export const handleProcessRowUpdate = async (
  newRow: GridRowModel<ViajeModel>,
  oldRow: GridRowModel<ViajeModel>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>
): Promise<GridRowModel<ViajeModel>> => {
  try {
    await updateViaje(newRow as ViajeModel);
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




export const handleAsignacionMasterRow = async (
  id: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<ViajeModel>>>,

  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    await asignacionMasterViaje(id);
    //setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    setError(null); // Limpiar cualquier error previo si la eliminación es exitosa
  } catch (error: any) {
    console.error("Error cambiando el estado en forma Admin-master", error);
    const message = error.message || 'Error cambiando el estado en forma Admin-master';
    setError(message);
  }
};

export const handleDeleteRow = async (
  id: number,
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp<ViajeModel>>>,

  setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    await deleteViaje(id);
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    setError(null); // Limpiar cualquier error previo si la eliminación es exitosa
  } catch (error: any) {
    console.error("Error deleting viaje", error);
    const message = error.message || 'Delete failed';
    setError(message);
  }
};

interface ErrorResponse {
  errors: Record<string, string[]>;
}
export const handleAddViaje = async (
  currentViaje: ViajeModel,
  fetchViajesData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentViaje: React.Dispatch<React.SetStateAction<ViajeModel>>,
  initialViaje: ViajeModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await addViaje(currentViaje);
    fetchViajesData(); // Recargar datos después de agregar
    setOpen(false);
    setCurrentViaje(initialViaje);
    setError(null); // Limpiar cualquier error previo si la adición es exitosa
    setModalErrors([]); // Limpiar cualquier error previo si la adición es exitosa
  } catch (error: any) {
    console.error("Error adding viaje", error);
    const message = error.message || 'Add failed';
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
  }
  setModalLoading(false);
};

export const handleEditViaje = async (
  currentViaje: ViajeModel,
  fetchViajesData: () => void,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentViaje: React.Dispatch<React.SetStateAction<ViajeModel>>,
  initialViaje: ViajeModel,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setModalLoading(true);
  try {
    await updateViaje(currentViaje);
    fetchViajesData(); // Recargar datos después de editar
    setOpen(false);
    setCurrentViaje(initialViaje);
    setError(null); // Limpiar cualquier error previo si la edición es exitosa
    setModalErrors([]); // Limpiar cualquier error previo si la edición es exitosa
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
  }
  setModalLoading(false);
};

export const revertirLote = async (lote_viaje_id: number) => {
  try {
    const response = await revertirLoteRequest(lote_viaje_id);
    return response.data;
  } catch (error) {
    console.error("Error revirtiendo el lote", error);
    throw error;
  }
};

export const handleFileUpload = async (
  file: File,
  operacion_id: number | boolean | string | string[],
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setUploadErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    await uploadFile(file, operacion_id);
    setError(null); // Limpiar cualquier error previo si la carga es exitosa
    setUploadErrors([]); // Limpiar cualquier error previo si la carga es exitosa
  } catch (error: any) {
    console.error("Error uploading file", error);
    const message = error.message || 'Upload failed';
    setError(message);
    if (error.response && error.response.data && error.response.data.errors) {
      const errors = Object.entries(error.response.data.errors as ErrorResponse["errors"]).map(
        ([field, descriptions]) => {
          return `${field}: ${(descriptions as string[]).join(' ')}`;
        }
      );
      setUploadErrors([message, ...errors]);
    } else {
      setUploadErrors([message]);
    }
  }
  setLoading(false);
};


export const asignarZonas = async (
  lote: number,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setAsignarZonasErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const response = await asignarZonasRequest(lote);
    setError(null); // Limpiar cualquier error previo si la asignación es exitosa
    setAsignarZonasErrors([]); // Limpiar cualquier error previo si la asignación es exitosa
    setLoading(false);

    return response.data;
  } catch (error: any) {
    console.error("Error assigning zones", error);
    const message = error.message || 'Asignar Zonas failed';
    setError(message);
    if (error.response && error.response.data && error.response.data.errors) {
      const errors = Object.entries(error.response.data.errors as ErrorResponse["errors"]).map(
        ([field, descriptions]) => {
          return `${field}: ${(descriptions as string[]).join(' ')}`;
        }
      );
      setAsignarZonasErrors([message, ...errors]);
    } else {
      setAsignarZonasErrors([message]);
    }
  }
  setLoading(false);
};

export const asignarTransportistas = async (
  lote: number,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    await asignarTransportistasRequest(lote);
    setError(null);
    setModalErrors([]);
  } catch (error: any) {
    console.error("Error assigning transportistas", error);
    setError(error.message);
    if (error.response && error.response.data && error.response.data.errors) {
      const errors = Object.values(error.response.data.errors).flat().map(String);
      setModalErrors(errors);
    } else {
      setModalErrors([error.message]);
    }
  }
  setLoading(false);
};



export const exportarViajePorLote = async (
  filters: Record<string, string | boolean | number | string[]>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setExportarViajesPorLoteErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>

) => {
  setLoading(true);
  //console.log("Descargando true");
  try {
    const response = await downloadViajesXlsx(filters);
    setError(null); // Limpiar cualquier error previo si la asignación es exitosa
    setExportarViajesPorLoteErrors([]); // Limpiar cualquier error previo si la asignación es exitosa
    setLoading(false);
    console.log("Descargando False");



  } catch (error: any) {


    const message = error.message || 'Exportando el XLSX';
    setError(message);
    if (error.response && error.response.data && error.response.data.errors) {
      const errors = Object.entries(error.response.data.errors as ErrorResponse["errors"]).map(
        ([field, descriptions]) => {
          return `${field}: ${(descriptions as string[]).join(' ')}`;
        }
      );
      setExportarViajesPorLoteErrors([message, ...errors]);
    } else {
      setExportarViajesPorLoteErrors([message]);
    }
  }
  setLoading(false);
};



export const cambioEstadoMasivo = async (
  filters: Record<string, string | boolean | number | string[]>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setcambioMasivoEstadoModalErrors: React.Dispatch<React.SetStateAction<string[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  estado_id_destino: string,
  showConfirmationDialog: (message: string) => Promise<boolean>  // Cambiamos aquí para usar una promesa
) => {
  setLoading(true);
  try {
    // Realizamos la consulta para obtener la cantidad de viajes
    const responseConsulta = await cambioMasivoEstadosConsultaRequest(filters, estado_id_destino);
    const cantidad = responseConsulta.data.cantidad;
    setLoading(true);
    if (cantidad === 0) {
      // Si no hay cambios por hacer, mostramos un mensaje especial
      const confirmation = await showConfirmationDialog('La consulta que va a ejecutar no va a producir ningún cambio.');
      
      if (!confirmation) {
        // Si el usuario cancela, salimos sin hacer nada
        setLoading(false);
        return;
      }
    } else {
      // Mostramos la confirmación para el cambio masivo
      const confirmation = await showConfirmationDialog(`¿Está seguro que quiere modificar ${cantidad} viajes?`);

      if (!confirmation) {
        // Si el usuario cancela, salimos sin hacer nada
        setLoading(false);
        return;
      }else{

        setLoading(true);
      }

      // Solo se ejecuta si el usuario confirma
      const response = await cambioMasivoEstadosRequest(filters, estado_id_destino);
      setError(null); // Limpiar cualquier error previo si la asignación es exitosa
      setcambioMasivoEstadoModalErrors([]); // Limpiar cualquier error previo si la asignación es exitosa
      setLoading(false);
      return response.data;
    }
  } catch (error: any) {
    console.error('Error cambiando masivamente', error);
    const message = error.message || 'El cambio masivo falló';
    setError(message);
    if (error.response && error.response.data && error.response.data.errors) {
      const errors = Object.entries(error.response.data.errors as ErrorResponse['errors']).map(
        ([field, descriptions]) => {
          return `${field}: ${(descriptions as string[]).join(' ')}`;
        }
      );
      setcambioMasivoEstadoModalErrors([message, ...errors]);
    } else {
      setcambioMasivoEstadoModalErrors([message]);
    }
    setLoading(false);
  }
  setLoading(false);
};
