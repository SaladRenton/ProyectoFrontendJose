import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ViajeModel } from '../../../core/_models';
import HistoryIcon from '@mui/icons-material/History';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Link from '@mui/material/Link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { format ,parseISO} from 'date-fns';
import AttachFileIcon from '@mui/icons-material/AttachFile'; // Importa el icono de documentos adjuntos
import CreateIcon from '@mui/icons-material/Create';



export const getColumns = (
  handleOpenEditModal: (viaje: ViajeModel) => void,
  handleDeleteRow: (id: number) => void,
  handleOpenHistoricosModal: (id: number) => void,
  handleOpenPaquetesModal: (paquetes: any[]) => void,
  handleOpenDireccionModal: (viaje: ViajeModel) => void,
  handleOpenContactosModal: (id: number) => void,
  handleOpenDocumentosModal: (id: number, viaje: ViajeModel) => void,
  handleOpenValidacionModal: (id: number, viaje: ViajeModel) => void,


): GridColDef[] => [
    {
      field: 'id', headerName: '#Numero', width: 90, editable: false,
      cellClassName: () => 'font-large'
      // getCellClassName: () => 'font-large', // Asigna una clase CSS a esta columna

    },
    {
      field: 'lote_viaje_id',
      headerName: '#Lote',
      width: 150,
      editable: false,
      cellClassName: () => 'font-lote'

    },
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


   

    {
      field: 'fecha_inicio',
      headerName: 'Fecha Inicio',
      width: 150,
      editable: false,
      renderCell: (params) => {
    
        
       //return params.value ? format(new Date(params.value), 'dd/MM/yyyy') : null;esto asi atrasa un dia en la fecha
        return params.value ? format(parseISO(params.value), 'dd/MM/yy') : null;
      },
    },
    {
      field: 'rango_horario',
      headerName: 'Rango Horario',
      width: 150,
      editable: false,
      renderCell: (params) => {
        const { hora_desde, hora_hasta } = params.row;
    
        const parseTime = (time) => {
          if (!time) return null;
          const [hours, minutes, seconds] = time.split(':');
          const date = new Date();
          date.setHours(parseInt(hours, 10));
          date.setMinutes(parseInt(minutes, 10));
          date.setSeconds(parseInt(seconds, 10));
          return date;
        };
    
        const formatTime = (date) => date ? format(date, 'HH:mm') : '';
    
        const desdeDate = parseTime(hora_desde);
        const hastaDate = parseTime(hora_hasta);
    
        return desdeDate && hastaDate ? `${formatTime(desdeDate)} - ${formatTime(hastaDate)}` : '';
      },
    },
    {
      field: 'fecha_fin',
      headerName: 'Fecha Fin',
      width: 150,
      editable: false,
      renderCell: (params) => {
        return params.value ? format(parseISO(params.value), 'dd/MM/yy') : null;
      },
    },
    
    {
      field: 'estado_actual.d_estado',
      headerName: 'Estado',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.estado_actual?.d_estado
    },

   
    //{ field: 'latitud', headerName: 'Latitud', width: 150, editable: true },
    //{ field: 'longitud', headerName: 'Longitud', width: 150, editable: true },

    { field: 'nombre', headerName: 'Nombre', width: 150, editable: false },
    { field: 'apellido', headerName: 'Apellido', width: 150, editable: false },


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
    
    
    { field: 'cantidad', headerName: 'Cantidad', width: 150, editable: false },

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
      field: 'contactos', headerName: 'Contactos', width: 150,

      renderCell: (params) => (

        <IconButton onClick={() => handleOpenContactosModal(params.row.id)}>
          <HistoryIcon />
        </IconButton>
      ),

    },

    {
      field: 'documentos', headerName: 'Documentos', width: 150,

      renderCell: (params) => (

        <IconButton onClick={() => handleOpenDocumentosModal(params.row.id, params.row)}>
          <AttachFileIcon />
        </IconButton>
      ),

    },


    {
      field: 'validaciones', headerName: 'Validacion', width: 150,

      renderCell: (params) => (

        <IconButton onClick={() => handleOpenValidacionModal(params.row.id, params.row)}>
          <CreateIcon style={{ color: params.row.validacion ? 'green' : 'gray' }} />
        </IconButton>
      ),

    },



  
  ];
