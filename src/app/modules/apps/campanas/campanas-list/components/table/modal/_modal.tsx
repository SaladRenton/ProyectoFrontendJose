import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, CircularProgress, FormControlLabel, Checkbox, Tabs, Tab, Box } from '@mui/material';
import { CampanaModel } from '../../../core/_models';
import OperacionCombo from '../../../../../../combos/components/OperacionCombo';
import OperacionZonaRepartoCombo from '../../../../../../combos/components/OperacionZonaRepartoCombo';
import HtmlEditor from '../../../../../../texteditor/components/HtmlEditor';

interface CampanaModalProps {
  open: boolean;
  currentCampana: CampanaModel;
  modalLoading: boolean;
  validationError: string | null;
  modalErrors: string[];
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onOperacionChange: (value: number) => void;
  onZonasRepartoChange: (value: string[]) => void;
  onsetHtmlContent: (value: string) => void;
}

const CampanaModal: React.FC<CampanaModalProps> = ({
  open,
  currentCampana,
  modalLoading,
  validationError,
  modalErrors,
  onClose,
  onChange,
  onSubmit,
  onOperacionChange,
  onZonasRepartoChange,
  onsetHtmlContent
}) => {
  const [operacionId, setOperacionId] = useState<string>('');
  const [zonaRepartoId, setZonaRepartoId] = useState<string[]>([]);
  const [htmlplantilla, setHtmlContent] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<number>(0); // Para manejar los tabs

  const handleOperacionChange = (value: number) => {
    setOperacionId(value.toString());
    onOperacionChange(value);
  };

  const handleZonasRepartoChange = (value: string[]) => {
    setZonaRepartoId(value);
    onZonasRepartoChange(value);
  };

  const handleOnChange = (value: string) => {
    setHtmlContent(value); // Aquí guardas el contenido HTML directamente
    onsetHtmlContent(value);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{'Agregar Nuevo Campaña'}</DialogTitle>
      <DialogContent>
        <Tabs value={selectedTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
          <Tab label="General" />
          <Tab label="Correo Masivo" />
          <Tab label="Agenda" />
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
              value={currentCampana.nombre}
              onChange={onChange}
              name="nombre"
            />
            <TextField
              margin="dense"
              label="Descripción"
              fullWidth
              required
              value={currentCampana.descripcion}
              onChange={onChange}
              name="descripcion"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentCampana.activa}
                  onChange={onChange}
                  name="activa"
                  color="primary"
                />
              }
              label="Activa"
            />

            <TextField
              label="Lote Viaje ID"
              type="number"
              fullWidth
              name="lote_viaje_id"
              value={currentCampana.lote_viaje_id}
              onChange={onChange}
              margin="dense"
            />

            <OperacionCombo
              value={operacionId as string}
              onChange={(value) => handleOperacionChange(value as number)}
            />

            <OperacionZonaRepartoCombo
              operacionId={operacionId}
              value={zonaRepartoId}
              onChange={(value) => handleZonasRepartoChange(value)}
            />
          </Box>
        )}

        {/* Tab Correo Masivo */}
        {selectedTab === 1 && (
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Asunto del correo"
              fullWidth
              margin="dense"
              name="asunto_correo"
              value={currentCampana.asunto_correo}
              onChange={onChange}
            />
            <HtmlEditor value={currentCampana.plantilla_email} onChange={handleOnChange} />
          </Box>
        )}

        {/* Tab Agenda */}
        {selectedTab === 2 && (
          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentCampana.fecha_limitada_agenda}
                  onChange={onChange}
                  name="fecha_limitada_agenda"
                  color="primary"
                />
              }
              label="La disponibilidad funciona con la agenda del transportista asignado"
            />

            <TextField
              label="Limitar a X días para adelante la agenda"
              type="number"
              fullWidth
              name="limite_dias_cita"
              value={currentCampana.limite_dias_cita}
              onChange={onChange}
              margin="dense"
            />
          </Box>
        )}

        {/* Mensajes de error */}
        {validationError && (
          <div className="alert alert-danger d-flex align-items-center p-5 mt-3">
            <span className="svg-icon svg-icon-2hx svg-icon-danger me-3">...</span>
            <div className="d-flex flex-column">
              <h5 className="mb-1">Validation Error</h5>
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
        <Button onClick={onSubmit} color="primary" disabled={modalLoading}>
          {modalLoading ? <CircularProgress size={24} /> : 'Agregar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CampanaModal;
