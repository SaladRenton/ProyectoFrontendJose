import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TransportistaModel } from '../../../core/_models'; // Importa la interfaz adaptada


export const getColumns = (
    handleOpenEditModal: (transportista: TransportistaModel) => void,
    handleDeleteRow: (id: number) => void
  ): GridColDef[] => [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    { field: 'razon_social', headerName: 'Name', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 150, editable: true },
    { field: 'localidad', headerName: 'Localidad', width: 100, editable: true },
    { field: 'ciudad', headerName: 'Ciudad', width: 100, editable: true },
    { field: 'calle', headerName: 'Calle', width: 50, editable: true },
    { field: 'numero_calle', headerName: 'Nro. Calle', width: 100, editable: true },
    { field: 'piso', headerName: 'Piso', width: 100, editable: true },
    { field: 'dpto', headerName: 'Dpto', width: 100, editable: true },
    { field: 'tel', headerName: 'Tel.', width: 100, editable: true },
    { field: 'cuit', headerName: 'Cuit.', width: 100, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleOpenEditModal(params.row as TransportistaModel)}
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