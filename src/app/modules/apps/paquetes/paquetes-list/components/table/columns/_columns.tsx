import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { PaqueteModel } from '../../../core/_models'; // Importa la interfaz adaptada
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


export const getColumns = (
    handleOpenEditModal: (paquete: PaqueteModel) => void,
    handleDeleteRow: (id: number) => void
  ): GridColDef[] => [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    {
      field: 'operacion.d_operacion',
      headerName: 'Operación',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.operacion?.d_operacion
    },
    {
      field: 'persona.razon_social',
      headerName: 'Transportista',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.persona?.razon_social
    },
    {
      field: 'ultimo_viaje.viaje_id',
      headerName: 'Viaje',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.ultimo_viaje?.viaje_id
    },
    { field: 'lote_externo', headerName: 'Lote Externo', width: 150, editable: true },
    { field: 'lote_equipos_id', headerName: 'Lote Interno', width: 100, editable: true },
    { field: 'codigo_barra', headerName: 'Cod. Barra', width: 120, editable: true },
    { field: 'numero_serie', headerName: 'Num. Serie', width: 120, editable: true },
    { field: 'mac', headerName: 'Mac', width: 120, editable: true },
    { field: 'caja', headerName: 'Caja', width: 120, editable: true },
    { field: 'pallet', headerName: 'Pallet', width: 120, editable: true },
    {
      field: 'entregado',
      headerName: 'Entregado',
      width: 150,
      renderCell: (params) => (
        params.value ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'gray' }} />
      ),
    },
   
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleOpenEditModal(params.row as PaqueteModel)}
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