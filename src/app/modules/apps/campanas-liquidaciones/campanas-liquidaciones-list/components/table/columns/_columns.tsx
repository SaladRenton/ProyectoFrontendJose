import { GridColDef } from '@mui/x-data-grid';
import { format ,parseISO} from 'date-fns';




export const getColumns = (

 
  ): GridColDef[] => [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    { field: 'viaje_id', headerName: 'Lead', width: 150, editable: true },

    {
      field: 'fecha_contacto',
      headerName: 'Fecha',
      width: 150,
      editable: false,
      renderCell: (params) => {
        return params.value ? format(parseISO(params.value), 'dd/MM/yy') : null;
      },
    },
    {
      field: 'medio_contacto.nombre',
      headerName: 'Medio de contacto',
      width: 200,
      editable: false,
      valueGetter: (params) => params.row.medio_contacto?.nombre
    },
    {
      field: 'campana.nombre',
      headerName: 'Campaña',
      width: 200,
      editable: false,
      valueGetter: (params) => params.row.campana?.nombre
    },
    { field: 'agent_id', headerName: 'Id Agente', width: 150, editable: false },
    { field: 'agent_username', headerName: 'Agente username', width: 200, editable: false },
    { field: 'id_contacto', headerName: 'ID Contacto CRM', width: 200, editable: false },
    {
      field: 'type.codigo_crm',
      headerName: 'Calificación',
      width: 200,
      editable: false,
      valueGetter: (params) => params.row.type?.codigo_crm
    },
    
   
   
  ];