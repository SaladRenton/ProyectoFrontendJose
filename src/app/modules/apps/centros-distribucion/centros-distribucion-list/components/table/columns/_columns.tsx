import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { CentroDistribucionModel } from '../../../core/_models'; // Importa la interfaz adaptada


export const getColumns = (
    handleOpenEditModal: (transportista: CentroDistribucionModel) => void,
    handleDeleteRow: (id: number) => void
  ): GridColDef[] => [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    { field: 'nombre', headerName: 'Nombre', width: 150, editable: true },
    { field: 'latitud', headerName: 'Latitud', width: 100, editable: true },
    { field: 'longitud', headerName: 'Longitud', width: 100, editable: true },
  
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleOpenEditModal(params.row as CentroDistribucionModel)}
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