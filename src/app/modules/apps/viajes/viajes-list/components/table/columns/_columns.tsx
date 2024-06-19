import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ViajeModel } from '../../../core/_models';
import HistoryIcon from '@mui/icons-material/History';

export const getColumns = (
  handleOpenEditModal: (viaje: ViajeModel) => void,
  handleDeleteRow: (id: number) => void,
  handleOpenHistoricosModal: (id: number) => void
): GridColDef[] => [
    { field: 'id', headerName: 'Numero', width: 90, editable: false },
    {
      field: 'operacion.d_operacion',
      headerName: 'Operación',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.operacion?.d_operacion
    },
    {
      field: 'zona_reparto.codigo_zona',
      headerName: 'Zona',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.zona_reparto?.codigo_zona
    },
    {
      field: 'persona.razon_social',
      headerName: 'Transportista',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.persona?.razon_social
    },
    { field: 'id_identificador_cliente_externo', headerName: 'Nro. Cliente Externo', width: 150, editable: true },
    { field: 'lote_viaje_id', headerName: 'Lote', width: 150, editable: true },

    { field: 'contacto_exitoso', headerName: 'Contacto Exitoso', width: 150, editable: true, type: 'boolean' },
    { field: 'fecha_inicio', headerName: 'Fecha Inicio', width: 150, editable: true, type: 'dateTime' },
    { field: 'fecha_fin', headerName: 'Fecha Fin', width: 150, editable: true, type: 'dateTime' },
    {
      field: 'estado_actual.d_estado',
      headerName: 'Estado',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.estado_actual?.d_estado
    },
    { field: 'fecha_creacion', headerName: 'Fecha Creación', width: 150, editable: true, type: 'dateTime' },
    //{ field: 'latitud', headerName: 'Latitud', width: 150, editable: true },
    //{ field: 'longitud', headerName: 'Longitud', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
    { field: 'nombre', headerName: 'Nombre', width: 150, editable: true },
    { field: 'apellido', headerName: 'Apellido', width: 150, editable: true },
    { field: 'id_identificacion_externo', headerName: 'ID Identificación Externo', width: 150, editable: true },
    { field: 'direccion', headerName: 'Dirección', width: 200, editable: true },

    { field: 'user_id', headerName: 'User ID', width: 150, editable: true },
    { field: 'calle', headerName: 'Calle', width: 150, editable: true },
    { field: 'numero', headerName: 'Número', width: 150, editable: true },
    { field: 'piso_dpto', headerName: 'Piso/Dpto', width: 150, editable: true },
    { field: 'entre_calle_1', headerName: 'Entre Calle 1', width: 150, editable: true },
    { field: 'entre_calle_2', headerName: 'Entre Calle 2', width: 150, editable: true },
    { field: 'codigo_postal', headerName: 'Código Postal', width: 150, editable: true },
    { field: 'partido', headerName: 'Partido', width: 150, editable: true },
    { field: 'localidad', headerName: 'Localidad', width: 150, editable: true },
    { field: 'id_localidad', headerName: 'ID Localidad', width: 150, editable: true },
    { field: 'telefono', headerName: 'Teléfono', width: 150, editable: true },
    { field: 'whatsapp', headerName: 'Whatsapp', width: 150, editable: true },
    { field: 'cantidad', headerName: 'Cantidad', width: 150, editable: true },

    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <>


          <IconButton
            color="default"
            onClick={() => handleOpenHistoricosModal(params.row.id)}
          >
            <HistoryIcon />
          </IconButton>

          <IconButton
            color="primary"
            onClick={() => handleOpenEditModal(params.row as ViajeModel)}
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
