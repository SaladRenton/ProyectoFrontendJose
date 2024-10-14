import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';




export const getColumns = (
  handleDeleteRow: (id: number) => void
): GridColDef[] => [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    { field: 'd_operacion', headerName: 'Nombre', width: 150, editable: false },
    { field: 'descripcion', headerName: 'Desc', width: 150, editable: false },
    {
      field: 'requiere_documentos',
      headerName: 'Req. Docs?',
      width: 150,
      renderCell: (params) => (
        params.value ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'gray' }} />
      ),
    },
    {
      field: 'requiere_equipos',
      headerName: 'Req. Equips?',
      width: 150,
      renderCell: (params) => (
        params.value ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'gray' }} />
      ),
    },
    {
      field: 'estado_inicial.d_estado',
      headerName: 'Estado Inicial',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.estado_inicial?.d_estado
    },

    { field: 'fecha_inicio', headerName: 'Fecha Inicio', width: 150, editable: true, type: 'dateTime' },
    { field: 'fecha_fin', headerName: 'Fecha Fin', width: 150, editable: true, type: 'dateTime' },

    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => {

        const navigate = useNavigate();

        const handleEditClick = (id: number) => {
          navigate(`/pages/operacion/${id}`);
        };

        return (

          <EditIcon
            onClick={() => handleEditClick(params.row.id)} // Asegúrate de que `params.row.id` sea el ID correcto
            style={{ cursor: 'pointer', color: 'blue' }} // Añade estilo para indicar que es interactivo
          />
        )



      },
    },
  ];