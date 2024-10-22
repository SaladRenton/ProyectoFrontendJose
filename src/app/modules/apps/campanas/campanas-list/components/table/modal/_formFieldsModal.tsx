import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';

interface FormField {
  id: number;
  name: string;
  type: string;
  visible_name: string;
  show_tms: boolean;
  required: boolean;
  orden: number;
  valor_default: string;
  show_form: boolean;
}

interface FormFieldsModalProps {
  open: boolean;
  onClose: () => void;
  formularioId: number | null;
}

const FormFieldsModal: React.FC<FormFieldsModalProps> = ({ open, onClose, formularioId }) => {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar form_fields cuando el modal se abre
  useEffect(() => {
    if (open && formularioId) {
      fetchFormFields();
    }
  }, [open, formularioId]);

  const fetchFormFields = async () => {
    setLoading(true);
    try {
    
      const API_URL = import.meta.env.VITE_APP_API_URL;

      const response = await axios.get(`${API_URL}/formulario/${formularioId}/form_fields`);
      setFormFields(response.data.data);
      setError(null);
    } catch (error) {
      setError('Error al cargar los campos del formulario.');
      setFormFields([]);
    }
    setLoading(false);
  };

  // Columnas para la grilla de form_fields
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'visible_name', headerName: 'Nombre Visible', width: 150 },
    { field: 'type', headerName: 'Tipo', width: 100 },
    { field: 'valor_default', headerName: 'Valor por Defecto', width: 150 },
    {
      field: 'show_tms',
      headerName: 'Mostrar en TMS',
      width: 130,
      renderCell: (params) => (params.value ? '✔️' : '❌'),
    },
    {
      field: 'required',
      headerName: 'Requerido',
      width: 130,
      renderCell: (params) => (params.value ? '✔️' : '❌'),
    },
    { field: 'orden', headerName: 'Orden', width: 100 },
    {
      field: 'show_form',
      headerName: 'Mostrar en Formulario',
      width: 150,
      renderCell: (params) => (params.value ? '✔️' : '❌'),
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Campos del Formulario</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={formFields} columns={columns} pageSize={5} rowsPerPageOptions={[5]} getRowId={(row) => row.id} />
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

export default FormFieldsModal;
