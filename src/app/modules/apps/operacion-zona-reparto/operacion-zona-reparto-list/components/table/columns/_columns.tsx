import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


export const getColumns = (
  handleDeleteRow: (id: number) => void
): GridColDef[] => [
    { field: 'zona_reparto_id', headerName: 'Zona ID', width: 150, hide: false },

    {
      field: 'zona_reparto.nombre',
      headerName: 'Nombre',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.zona_reparto?.nombre
    },

    {
      field: 'zona_reparto.codigo_zona',
      headerName: 'Código',
      width: 200,
      editable: false,
      valueGetter: (params) => params.row.zona_reparto?.codigo_zona
    },
    {
      field: 'zona_reparto.state_district',
      headerName: 'Distrito',
      width: 200,
      editable: false,
      valueGetter: (params) => params.row.zona_reparto?.state_district
    },
    {
      field: 'zona_reparto.state',
      headerName: 'Estado',
      width: 200,
      editable: false,
      valueGetter: (params) => params.row.zona_reparto?.state
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