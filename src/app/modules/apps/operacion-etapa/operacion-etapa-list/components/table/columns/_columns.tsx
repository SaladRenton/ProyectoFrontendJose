import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


export const getColumns = (
  handleDeleteRow: (id: number) => void
): GridColDef[] => [
    { field: 'etapa_id', headerName: 'Etapa ID', width: 150, hide: false },

    {
      field: 'etapa.nombre',
      headerName: 'Etapa',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.etapa?.nombre
    },
    {
      field: 'orden',
      headerName: 'Orden',
      width: 150,
      editable: false,
     
    },
    {
      field: 'notificar',
      headerName: 'Etapa notifica?',
      width: 200,
      hide: false,
      editable: false,
      renderCell: (params) => (params.value ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'gray' }} />),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <>

          <IconButton
            color="secondary"
            onClick={() => handleDeleteRow(params.id as number)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];