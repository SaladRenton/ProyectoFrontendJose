import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { CalificacionesModel } from '../../../core/_models'; // Importa la interfaz adaptada


export const getColumns = (
    handleOpenEditModal: (transportista: CalificacionesModel) => void,
    handleDeleteRow: (id: number) => void
  ): GridColDef[] => [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
  
    { field: 'descripcion', headerName: 'Descripción', width: 200, editable: true },
    { field: 'codigo', headerName: 'Código', width: 200, editable: true },
    { field: 'codigo_crm', headerName: 'Código CRM', width: 200, editable: true },
 
  
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleOpenEditModal(params.row as CalificacionesModel)}
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