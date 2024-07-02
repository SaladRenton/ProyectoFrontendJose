import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ViajeModel } from '../../../core/_models';
import HistoryIcon from '@mui/icons-material/History';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Link from '@mui/material/Link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


export const getColumns = (
  handleOpenEditModal: (viaje: ViajeModel) => void,
  handleDeleteRow: (id: number) => void,
  handleOpenHistoricosModal: (id: number) => void,
  handleOpenPaquetesModal: (paquetes: any[]) => void,
  handleOpenDireccionModal: (viaje: ViajeModel) => void

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
    { field: 'documento', headerName: 'Documento', width: 100, editable: false },

    { field: 'id_identificador_cliente_externo', headerName: 'Nro. Cliente Externo', width: 150, editable: true },
    { field: 'lote_viaje_id', headerName: 'Lote', width: 150, editable: true },
    { field: 'lote_externo', headerName: 'Lote Externo', width: 150, editable: false },

    { field: 'contacto_exitoso', headerName: 'Contacto Exitoso', width: 150, editable: true, type: 'boolean' },
    { field: 'fecha_inicio', headerName: 'Fecha Inicio', width: 150, editable: true, type: 'dateTime' },
    { field: 'fecha_fin', headerName: 'Fecha Fin', width: 150, editable: true, type: 'dateTime' },
    {
      field: 'contacto_en_omnileads',
      headerName: 'Contacto en Omnileads',
      width: 150,
      renderCell: (params) => (
        params.value ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'gray' }} />
      ),
    },
    {
      field: 'error_contacto_omnileads',
      headerName: 'Error Contacto Omnileads',
      width: 200,
      editable: false,
    },
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


    { field: 'user_id', headerName: 'User ID', width: 150, editable: true },
    {
      field: 'direccion',
      headerName: 'Dirección',
      width: 100,
      renderCell: (params) => (




        <IconButton onClick={() => handleOpenDireccionModal(params.row)}>
          <LocationOnIcon style={{ color: 'orange' }} />
        </IconButton>

      ),
    },
    { field: 'telefono', headerName: 'Teléfono', width: 150, editable: true },
    {
      field: 'whatsapp', headerName: 'WhatsApp', width: 150,
      renderCell: (params) => {
        const whatsappNumber = params.value;
        if (whatsappNumber) {
          return (
            <Link
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon style={{ color: 'green' }} />
            </Link>
          );
        } else {
          return null; // No mostrar el icono si el número de WhatsApp es null
        }
      },
    },
    { field: 'cantidad', headerName: 'Cantidad', width: 150, editable: true },

    {
      field: 'paquetes', headerName: 'Paquetes', width: 150,
      renderCell: (params) => {
        const hasPaquetes = params.row.paquetes && params.row.paquetes.length > 0;
        return (
          <IconButton onClick={() => handleOpenPaquetesModal(params.row.paquetes)}>
            <LocalShippingIcon style={{ color: hasPaquetes ? 'blue' : 'gray' }} />
          </IconButton>
        );
      },
    },

    {
      field: 'estados', headerName: 'Estados', width: 150,

      renderCell: (params) => (

        <IconButton onClick={() => handleOpenHistoricosModal(params.row.id)}>
          <HistoryIcon />
        </IconButton>
      ),

    },

    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleOpenEditModal(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteRow(params.row.id)}>
            <DeleteIcon />
          </IconButton>



        </>
      ),
    },
  ];
