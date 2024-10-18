import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


export const getColumns = (
  handleDeleteRow: (id: number) => void
): GridColDef[] => [
    { field: 'id', headerName: 'ID', width: 100, hide: false },

    {
      field: 'irregularidad.descripcion',
      headerName: 'Irregularidad',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.irregularidad?.descripcion
    },
    {
      field: 'estado.d_estado',
      headerName: 'Estado',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.estado?.d_estado
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