import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ZonaModel } from '../../../core/_models'; // Importa la interfaz adaptada


export const getColumns = (
    handleOpenEditModal: (zona: ZonaModel) => void,
    handleDeleteRow: (id: number) => void
  ): GridColDef[] => [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    { field: 'nombre', headerName: 'Nombre', width: 150, editable: true },
    { field: 'codigo_zona', headerName: 'Codigo', width: 150, editable: false },
    { field: 'addresstype', headerName: 'Tipo', width: 150, editable: false },
    { field: 'display_name', headerName: 'Nombre Largo', width: 300, editable: false },
    { field: 'town', headerName: 'Ciudad', width: 150, editable: false },
    { field: 'state_district', headerName: 'Distrito', width: 150, editable: false },
    { field: 'state', headerName: 'Provincia', width: 150, editable: false },
    { field: 'postcode', headerName: 'Cod. Postal', width: 150, editable: false },
  
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleOpenEditModal(params.row as ZonaModel)}
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