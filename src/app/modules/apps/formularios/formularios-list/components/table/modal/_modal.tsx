import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Tabs,
  Tab,
  Box,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { FormularioModel } from '../../../core/_models';
import OperacionCombo from '../../../../../../combos/components/OperacionCombo';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { DataGrid } from '@mui/x-data-grid';

interface FormularioModalProps {
  open: boolean;
  currentFormulario: FormularioModel;
  modalLoading: boolean;
  validationError: string | null;
  modalErrors: string[];
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (formulario: FormularioModel) => void;
  onOperacionChange: (value: number) => void;
  onFormFieldChange: (formFields: any[]) => void; // Para actualizar los campos form_field en el padre
}

const FormularioModal: React.FC<FormularioModalProps> = ({
  open,
  currentFormulario,
  modalLoading,
  validationError,
  modalErrors,
  onClose,
  onChange,
  onSubmit,
  onOperacionChange,
  onFormFieldChange,
}) => {
  const [operacionId, setOperacionId] = useState<string>(currentFormulario.operacion_id?.toString() || '');
  const [selectedTab, setSelectedTab] = useState<number>(0); // Para manejar los tabs
  const [campos, setCampos] = useState<any[]>(currentFormulario.form_field || []); // Maneja los campos de form_field
  const [isCampoModalOpen, setIsCampoModalOpen] = useState(false); // Estado para abrir/cerrar el modal de campo
  const [newCampo, setNewCampo] = useState<any | null>(null); // Nuevo campo para el modal de agregar
  const [campoErrors, setCampoErrors] = useState<string[]>([]);

  // Maneja el cambio en los tabs
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  // Actualiza el estado del formulario cuando cambia la operación
  const handleOperacionChange = (value: number) => {
    setOperacionId(value.toString());
    onOperacionChange(value); // Llama a la función para actualizar la operación en el padre
  };

  // Abre el modal para agregar un campo
  const handleOpenCampoModal = () => {
    setNewCampo({
      id: Date.now(), // Generar un ID único basado en la fecha
      name: '',
      type: 'string',
      visible_name: '',
      show_tms: true,
      required: true,
      orden: campos.length + 1,
      valor_default: '',
      show_form: true,
    });
    setIsCampoModalOpen(true);
  };

  // Cierra el modal de campo
  const handleCloseCampoModal = () => {
    setNewCampo(null);
    setCampoErrors([]);
    setIsCampoModalOpen(false);
  };

  // Maneja los cambios dentro del modal de campo
  const handleCampoModalChange = (field: string, value: any) => {
    setNewCampo((prev) => ({ ...prev, [field]: value }));
  };

  // Función especial para validar el nombre y llamar a onChange si está todo bien
  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''); // Solo minúsculas, números y guion bajo
    handleCampoModalChange('name', value); // Actualiza el campo con el valor permitido
  };

  // Valida y guarda el nuevo campo en la grilla
  const handleSaveCampo = () => {
    const errors: string[] = [];

    // Verificar si ya existe un campo con el mismo nombre
    if (campos.some((campo) => campo.name === newCampo.name)) {
      errors.push('Ya existe un campo con este nombre.');
    }

    if (!newCampo.name || !/^[a-z0-9_]+$/.test(newCampo.name)) {
      errors.push('El campo "Nombre" es obligatorio y debe estar en minúsculas, sin espacios ni caracteres especiales (excepto el guion bajo "_").');
    }

    if (!newCampo.visible_name) {
      errors.push('El "Nombre Visible" es obligatorio.');
    }

    // Validar que el valor por defecto coincida con el tipo
    if (newCampo.valor_default) {
      if (
        (newCampo.type === 'int' && isNaN(parseInt(newCampo.valor_default))) ||
        (newCampo.type === 'float' && isNaN(parseFloat(newCampo.valor_default))) ||
        (newCampo.type === 'date' && isNaN(Date.parse(newCampo.valor_default)))
      ) {
        errors.push(`El valor por defecto debe coincidir con el tipo "${newCampo.type}".`);
      }
    }

    if (errors.length > 0) {
      setCampoErrors(errors);
      return;
    }

    // Guardar el nuevo campo en la grilla
    setCampos((prev) => [...prev, newCampo]);
    onFormFieldChange([...campos, newCampo]); // Actualiza los form_field en el componente padre
    handleCloseCampoModal(); // Cierra el modal si no hay errores
  };

  // Eliminar un campo de la grilla
  const handleDeleteCampo = (id: number) => {
    const updatedCampos = campos.filter((campo) => campo.id !== id);
    setCampos(updatedCampos);
    onFormFieldChange(updatedCampos); // Actualiza los form_field en el componente padre
  };

  // Maneja cambios en el orden de los campos
  const handleOrderChange = (id: number, newOrder: number) => {
    const updatedCampos = campos.map((campo) => {
      if (campo.id === id) {
        return { ...campo, orden: newOrder };
      }
      return campo;
    });
    const sortedCampos = updatedCampos.sort((a, b) => a.orden - b.orden); // Reordena por el campo "orden"
    setCampos(sortedCampos);
    onFormFieldChange(sortedCampos); // Actualiza los form_field en el componente padre
  };

  // Maneja el envío del formulario al presionar Guardar
  const handleSubmit = () => {
    if (!currentFormulario.name || campos.length === 0) {
      setCampoErrors(['Debe haber al menos un campo agregado y el nombre es obligatorio.']);
      return;
    }
    onSubmit({
      ...currentFormulario,
      operacion_id: Number(operacionId),
      form_field: campos, // Añade los campos al formulario
    });
  };

  // Definir columnas de la grilla de campos
  const columns = [
    {
      field: 'delete',
      headerName: 'Eliminar',
      width: 80,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteCampo(params.id as number)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'visible_name', headerName: 'Nombre Visible', width: 150 },
    { field: 'type', headerName: 'Tipo', width: 150 },
    { field: 'valor_default', headerName: 'Valor por Defecto', width: 150 },
    {
      field: 'show_tms',
      headerName: 'Mostrar en TMS',
      width: 150,
      renderCell: (params) =>
        params.value ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'gray' }} />,
    },
    {
      field: 'required',
      headerName: 'Requerido',
      width: 100,
      renderCell: (params) =>
        params.value ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'gray' }} />,
    },
    { field: 'orden', headerName: 'Orden', width: 100, editable: true },
    {
      field: 'show_form',
      headerName: 'Mostrar en Formulario',
      width: 150,
      renderCell: (params) =>
        params.value ? <CheckCircleIcon style={{ color: 'green' }} /> : <CancelIcon style={{ color: 'gray' }} />,
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{'Agregar Nuevo Formulario'}</DialogTitle>
      <DialogContent>
        <Tabs value={selectedTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
          <Tab label="General" />
          <Tab label="Campos" />
        </Tabs>

        {/* Tab General */}
        {selectedTab === 0 && (
          <Box sx={{ mt: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre"
              fullWidth
              required
              value={currentFormulario.name}
              onChange={onChange}
              name="name"
            />
            <OperacionCombo value={operacionId} onChange={(value) => handleOperacionChange(value as number)} />
          </Box>
        )}

        {/* Tab Campos */}
        {selectedTab === 1 && (
          <Box sx={{ mt: 2 }}>
            <Button startIcon={<AddIcon />} onClick={handleOpenCampoModal}>
              Agregar Nuevo Campo
            </Button>
            <div style={{ height: 300, width: '100%', marginTop: 10 }}>
              <DataGrid
                rows={campos}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                getRowId={(row) => row.id}
                onCellEditCommit={(params) => {
                  if (params.field === 'orden') {
                    handleOrderChange(params.id as number, Number(params.value));
                  }
                }}
              />
            </div>
          </Box>
        )}

        {/* Mensajes de error */}
        {validationError && (
          <div className="alert alert-danger d-flex align-items-center p-5 mt-3">
            <span className="svg-icon svg-icon-2hx svg-icon-danger me-3">...</span>
            <div className="d-flex flex-column">
              <h5 className="mb-1">Hay errores de validación</h5>
              <span>{validationError}</span>
            </div>
          </div>
        )}
        {modalErrors.length > 0 && (
          <div className="alert alert-danger d-flex align-items-center p-5 mt-3">
            <span className="svg-icon svg-icon-2hx svg-icon-danger me-3">...</span>
            <div className="d-flex flex-column">
              <h5 className="mb-1">Error</h5>
              <span>{modalErrors.join(' ')}</span>
            </div>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={modalLoading}>
          {modalLoading ? <CircularProgress size={24} /> : 'Agregar'}
        </Button>
      </DialogActions>

      {/* Modal para agregar nuevo campo */}
      {isCampoModalOpen && (
        <Dialog open={isCampoModalOpen} onClose={handleCloseCampoModal} maxWidth="sm" fullWidth>
          <DialogTitle>{'Agregar Nuevo Campo'}</DialogTitle>
          <DialogContent>
            <TextField
              label="Nombre"
              value={newCampo?.name}
              onChange={handleNameInputChange}
              fullWidth
              required
            />
            <TextField
              label="Nombre Visible"
              value={newCampo?.visible_name}
              onChange={(e) => handleCampoModalChange('visible_name', e.target.value)}
              fullWidth
              required
            />
            <FormControl fullWidth required>
              <InputLabel>Tipo</InputLabel>
              <Select
                label="Tipo"
                value={newCampo?.type}
                onChange={(e) => handleCampoModalChange('type', e.target.value)}
              >
                <MenuItem value="string">string</MenuItem>
                <MenuItem value="int">int</MenuItem>
                <MenuItem value="float">float</MenuItem>
                <MenuItem value="date">date</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Valor por Defecto"
              value={newCampo?.valor_default}
              onChange={(e) => handleCampoModalChange('valor_default', e.target.value)}
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newCampo?.show_tms}
                  onChange={(e) => handleCampoModalChange('show_tms', e.target.checked)}
                  color="primary"
                />
              }
              label="Mostrar en TMS"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newCampo?.required}
                  onChange={(e) => handleCampoModalChange('required', e.target.checked)}
                  color="primary"
                />
              }
              label="Requerido"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newCampo?.show_form}
                  onChange={(e) => handleCampoModalChange('show_form', e.target.checked)}
                  color="primary"
                />
              }
              label="Mostrar en Formulario"
            />
            {campoErrors.length > 0 && (
              <div className="alert alert-danger d-flex align-items-center p-5 mt-3">
                <span className="svg-icon svg-icon-2hx svg-icon-danger me-3">...</span>
                <div className="d-flex flex-column">
                  <h5 className="mb-1">Errores</h5>
                  <span>{campoErrors.join(', ')}</span>
                </div>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCampoModal} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleSaveCampo} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Dialog>
  );
};

export default FormularioModal;
