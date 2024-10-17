import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { OperacionEtapaModel } from '../../../core/_models';



export const getColumns = (
  handleDeleteRow: (id: number) => void,
  handleOpenNotificacionModal: (operacionEtapa: OperacionEtapaModel) => void

): GridColDef[] => [
    { field: 'id', headerName: 'ID', width: 150, hide: false },
//{ field: 'etapa_id', headerName: 'Etapa ID', width: 150, hide: false },

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
      editable: true,

    },
    {
      field: 'notificar',
      headerName: 'Etapa notifica?',
      width: 200,
      hide: false,
      editable: false,
      renderCell: (params) => (params.row.notifica ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'gray' }} />),
    },
    {
      field: 'notificaciones',
      headerName: 'Notificaciones',
      width: 200,
      hide: false,
      editable: false,
      renderCell: (params) => (params.row.notificar ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'gray' }} />),
    },
    {
      field: 'notifica',
      headerName: 'Ver/Editar Notificaciones',
      width: 200,
      hide: false,
      editable: false,
      renderCell: (params) => (params.row.notificar ?

        <IconButton onClick={() => handleOpenNotificacionModal(params.row)}>
          <NotificationsIcon style={{ color: 'green' }} />
        </IconButton>
        : <CancelIcon style={{ color: 'gray' }} />),
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