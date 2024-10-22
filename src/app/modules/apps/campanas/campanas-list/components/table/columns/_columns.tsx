import { GridColDef } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import GetAppIcon from '@mui/icons-material/GetApp'; // Icono de descarga
import { IconButton } from '@mui/material';
import { GridRenderEditCellParams } from '@mui/x-data-grid';
import { Checkbox } from '@mui/material';
import { LinearProgress, Box, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DescriptionIcon from '@mui/icons-material/Description';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';




export const getColumns = (
  handleDownloadCsv: (id: number) => void,
  handleEnviarMasivo: (id: number) => void,
  handleEnviarWapMasivo: (id: number) => void,
  handleOpenFormFieldsModal: (id: number) => void,
  handleOpenContactoModal: (campanaId: number) => void,
): GridColDef[] => [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    { field: 'nombre', headerName: 'Nombre', width: 150, editable: true },
    {
      field: 'operacion.d_operacion',
      headerName: 'Operación',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.operacion?.d_operacion,
    },
    {
      field: 'form.name',
      headerName: 'Formulario',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.form?.name,
    },
    {
      field: 'form_fields',
      headerName: 'Ver Campos',
      width: 150,
      renderCell: (params) => {

        return (
          <IconButton onClick={() => handleOpenFormFieldsModal(params.row.form.id)}>
            <DescriptionIcon />
        </IconButton>
        );

      },
    },
    {
      field: 'form_contacts',
      headerName: 'Ver Contactos',
      width: 150,
      renderCell: (params) => {

        return (
          <IconButton onClick={() => handleOpenContactoModal(params.row.id)}>
            <ContactPhoneIcon />
        </IconButton>
        );

      },
    },
    { field: 'descripcion', headerName: 'Descripción', width: 150, editable: true },
    { field: 'total_emails_enviados', headerName: 'Mails Enviados', width: 150, editable: true },
    { field: 'total_whatsapp_enviados', headerName: 'WP Enviados', width: 150, editable: true },
    { field: 'total_campana_viajes', headerName: 'Cantidad Leads', width: 150, editable: false },
    { field: 'total_contact_attempts', headerName: 'Concretadas', width: 200, editable: false },
    { field: 'total_contact_attempts_oml', headerName: 'Total OML', width: 100, editable: false },
    { field: 'total_contact_attempts_agenda', headerName: 'Total Agenda', width: 100, editable: false },
    { field: 'total_viajes_entregados', headerName: 'Entregados/Cerrados', width: 150, editable: false },
    {
      field: 'porcentaje_entregados',
      headerName: '% Entregados',
      width: 200,
      editable: false,
      renderCell: (params) => {
        const { total_viajes_entregados, total_campana_viajes } = params.row;
        const porcentajeEntregados = total_campana_viajes > 0 ? (total_viajes_entregados / total_campana_viajes) * 100 : 0;

        return (
          <Box width="100%" display="flex" alignItems="center">
            <Box width="80%" mr={1}>
              <LinearProgress variant="determinate" value={porcentajeEntregados} style={{ height: '8px', borderRadius: '4px' }} />
            </Box>
            <Box minWidth={35}>
              <Typography variant="body2" color="textSecondary">
                {`${Math.round(porcentajeEntregados)}%`}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      field: 'csv',
      headerName: 'Csv',
      width: 150,
      renderCell: (params) => (
        <IconButton onClick={() => handleDownloadCsv(params.row.id)}>
          <GetAppIcon />
        </IconButton>
      ),
    },
    {
      field: 'masivo',
      headerName: 'Enviar Correo Masivo',
      width: 150,
      renderCell: (params) => (
        <IconButton
          onClick={() => {

            handleEnviarMasivo(params.row.id);

          }}
        >
          <MailIcon />
        </IconButton>
      ),
    },

    {
      field: 'envio_en_proceso',
      headerName: 'Envio mails activo?',
      width: 200,
      hide: false,
      editable: false,
      renderCell: (params) => (params.value ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'gray' }} />),
    },

    {
      field: 'masivoWap',
      headerName: 'Enviar Wap Masivo',
      width: 150,
      renderCell: (params) => (
        <IconButton
          onClick={() => {

            handleEnviarWapMasivo(params.row.id);

          }}
        >
          <WhatsAppIcon style={{ color: 'green' }} />
        </IconButton>
      ),
    },
    {
      field: 'envio_en_proceso_whatsapp',
      headerName: 'Envio Wap activo?',
      width: 200,
      hide: false,
      editable: false,
      renderCell: (params) => (params.value ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'gray' }} />),
    },
    {
      field: 'activa',
      headerName: 'Activa',
      width: 150,
      hide: false,
      editable: true,
      renderCell: (params) => (params.value ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'gray' }} />),
      renderEditCell: (params: GridRenderEditCellParams) => (
        <Checkbox
          checked={!!params.value}
          onChange={(event) => params.api.setEditCellValue({ id: params.id, field: params.field, value: event.target.checked })}
        />
      ),
    }

  ];
