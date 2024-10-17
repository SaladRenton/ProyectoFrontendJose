import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { OperacionEtapaNotificacionModel } from '../../../core/_models';
import { format ,parseISO} from 'date-fns';




export const getColumns = (
  handleDeleteRow: (id: number) => void,
  handleOpenEditModal: (etapaNotificacionModel: OperacionEtapaNotificacionModel) => void,

): GridColDef[] => [

   
    {
      field: 'medio_contacto.nombre',
      headerName: 'Medio Contacto',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.medio_contacto?.nombre

    },
    {
      field: 'updated_at',
      headerName: 'Fecha Modidificación',
      width: 150,
      editable: false,
      renderCell: (params) => {
    
        
       //return params.value ? format(new Date(params.value), 'dd/MM/yyyy') : null;esto asi atrasa un dia en la fecha
        return params.value ? format(parseISO(params.value), 'dd/MM/yy') : null;
      },
    },

  
  
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <>
        
          <IconButton
            color="primary"
            onClick={() => handleOpenEditModal(params.row as OperacionEtapaNotificacionModel)}
          >
            <EditIcon />
          </IconButton>

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