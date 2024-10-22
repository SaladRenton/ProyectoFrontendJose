import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';



interface ViajeCampana {
  id: number;
  whatsapp_enviado: boolean;
  mail_enviado: boolean;
  total_whatsapp_enviados: number;
  total_email_enviados: number;
 
}

interface ContactoModalProps {
  open: boolean;
  onClose: () => void;
  campanaId: number | null;
}

const ContactoModal: React.FC<ContactoModalProps> = ({ open, onClose, campanaId }) => {
  const [contacto, setContacto] = useState<ViajeCampana[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar form_fields cuando el modal se abre
  useEffect(() => {
    if (open && campanaId) {
      fetchContacto();
    }
  }, [open, campanaId]);

  const fetchContacto = async () => {
    setLoading(true);
    try {
    
      const API_URL = import.meta.env.VITE_APP_API_URL;
      const response = await axios.get(`${API_URL}/campanas/${campanaId}/viajes`,{
        params:{
          include: 'viaje'
        }


      });
      setContacto(response.data.data);
      setError(null);
    } catch (error) {
      setError('Error al cargar los campos del formulario.');
      setContacto([]);
    }
    setLoading(false);
  };

  // Columnas para la grilla de form_fields
  const columns: GridColDef[] = [


    {
      field: 'viaje.id',
      headerName: 'Contacto',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.viaje?.id,
    },
    {
      field: 'viaje.nombre',
      headerName: 'Nombre',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.viaje?.nombre,
    },
    {
      field: 'viaje.apellido',
      headerName: 'Apellido',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.viaje?.apellido,
    },

    { field: 'total_whatsapp_enviados', headerName: 'Cant. Whats Enviados', width: 150, editable: true },

    { field: 'total_email_enviados', headerName: 'Cant. Emails Enviados', width: 150, editable: true },

   
    {
      field: 'whatsapp_enviado',
      headerName: 'Whatsapp enviado?',
      width: 200,
      hide: false,
      editable: false,
      renderCell: (params) => (params.value ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'gray' }} />),
    },

    {
      field: 'mail_enviado',
      headerName: 'Mail enviado?',
      width: 200,
      hide: false,
      editable: false,
      renderCell: (params) => (params.value ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'gray' }} />),
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Contactos de la campaña</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={contacto} columns={columns} pageSize={5} rowsPerPageOptions={[5]} getRowId={(row) => row.id} />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactoModal;
