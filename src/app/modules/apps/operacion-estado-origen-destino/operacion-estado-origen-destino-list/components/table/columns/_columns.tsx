import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


export const getColumns = (
  handleDeleteRow: (id: number) => void
): GridColDef[] => [
    { field: 'id', headerName: 'ID', width: 150, hide: false },

    {
      field: 'estado_origen.d_estado',
      headerName: 'Estado Origen',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.estado_origen?.d_estado
    },
    {
      field: 'estado_destino.d_estado',
      headerName: 'Estado Destino',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.estado_destino?.d_estado
    },
    {
      field: 'contact_attempt_type.codigo',
      headerName: 'Calificacion Destino',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.contact_attempt_type?.codigo
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