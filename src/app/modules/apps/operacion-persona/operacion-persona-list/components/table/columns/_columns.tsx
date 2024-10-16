import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


export const getColumns = (
  handleDeleteRow: (id: number) => void
): GridColDef[] => [
    { field: 'persona_id', headerName: 'Transportista ID', width: 150, hide: false },

    {
      field: 'persona.razon_social',
      headerName: 'Transportista',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.persona?.razon_social
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