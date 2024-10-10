import { GridColDef } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import GetAppIcon from '@mui/icons-material/GetApp'; // Icono de descarga
import { IconButton } from '@mui/material';
import { GridRenderEditCellParams } from '@mui/x-data-grid';
import { Checkbox } from '@mui/material';
import { LinearProgress, Box, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


export const getColumns = (
): GridColDef[] => [
  { field: 'id', headerName: 'ID', width: 90, editable: false },
  { field: 'name', headerName: 'Nombre', width: 150, editable: true },
  {
    field: 'operacion.d_operacion',
    headerName: 'Operación',
    width: 150,
    editable: false,
    valueGetter: (params) => params.row.operacion?.d_operacion,
  }


  
];
