import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { EtapasModel } from '../../../core/_models'; // Importa la interfaz adaptada


export const getColumns = (
    handleOpenEditModal: (transportista: EtapasModel) => void,
    handleDeleteRow: (id: number) => void
  ): GridColDef[] => [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    { field: 'nombre', headerName: 'Nombre', width: 150, editable: true },
    { field: 'codigo', headerName: 'Codigo', width: 200, editable: true },

  
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleOpenEditModal(params.row as EtapasModel)}
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