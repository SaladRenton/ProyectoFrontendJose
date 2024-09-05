import { GridColDef } from '@mui/x-data-grid';
import { CampanaModel } from '../../../core/_models'; // Importa la interfaz adaptada
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import GetAppIcon from '@mui/icons-material/GetApp'; // Icono de descarga
import { IconButton } from '@mui/material';
import { GridRenderEditCellParams } from '@mui/x-data-grid';
import { Checkbox } from '@mui/material';




export const getColumns = (
  handleDownloadCsv: (id: number) => void,
 
  ): GridColDef[] => [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    { field: 'nombre', headerName: 'Nombre', width: 150, editable: true },
    { field: 'descripcion', headerName: 'Descripción', width: 300, editable: true },
    { field: 'total_campana_viajes', headerName: 'Cantidad Leads', width: 150, editable: false },
    { field: 'total_contact_attempts', headerName: 'Citas concretadas', width: 200, editable: false },
    {
      field: 'csv', headerName: 'Csv', width: 150,

      renderCell: (params) => (

        <IconButton onClick={() => handleDownloadCsv(params.row.id)}>
          <GetAppIcon />
        </IconButton>
      ),

    },
    {
      field: 'activa',
      headerName: 'Activa',
      width: 150,
      hide: false,
      editable: true,
      renderCell: (params) => (
        params.value ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'gray' }} />
      ),
      renderEditCell: (params: GridRenderEditCellParams) => (
        <Checkbox
          checked={!!params.value}
          onChange={(event) => params.api.setEditCellValue({ id: params.id, field: params.field, value: event.target.checked })}
        />
      ),
    },
   
   
  ];