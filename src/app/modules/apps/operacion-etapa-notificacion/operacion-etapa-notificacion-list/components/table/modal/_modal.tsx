import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress, FormControlLabel, Checkbox } from '@mui/material';
import { OperacionEtapaNotificacionModel } from '../../../core/_models';
import MediosContactoCombo from '../../../../../../combos/components/MediosContactoCombo';
import HtmlEditor from '../../../../../../texteditor/components/HtmlEditor';
import WhatsAppTextEditor from '../../../../../../texteditor/components/WhatsAppTextEditor';

interface OperacionesEtapaModalProps {
  open: boolean;
  editMode: boolean;
  currentOperacionesEtapa: OperacionEtapaNotificacionModel;
  modalLoading: boolean;
  validationError: string | null;
  modalErrors: string[];
  onClose: () => void;
  onSubmit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMedioContactoChange: (value: number | string) => void;
  onsetContent: (value: string) => void;

}

const OperacionesEtapaModal: React.FC<OperacionesEtapaModalProps> = ({
  open,
  editMode,
  modalLoading,
  currentOperacionesEtapa,
  validationError,
  modalErrors,
  onClose,
  onSubmit,
  onChange,
  onMedioContactoChange,
  onsetContent
}) => {

  // Determinar si se debe mostrar el editor de WhatsApp o el de HTML
  const isWhatsApp = currentOperacionesEtapa.medio_contacto_id === 1;

  const handleOnChange = (value: string) => {

    onsetContent(value);

  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editMode ? 'Editar la notificación a la etapa' : 'Agregar una notificación a la etapa'}</DialogTitle>

      <DialogContent>
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
        {/* Combo para seleccionar el medio de contacto */}
        <MediosContactoCombo
          value={((currentOperacionesEtapa.medio_contacto_id) ? currentOperacionesEtapa.medio_contacto_id : '') as string}
          onChange={onMedioContactoChange}
          disabled={editMode}
        />

        {/* Mostrar editor de WhatsApp si el medio de contacto es 1, caso contrario HTML */}
        {isWhatsApp ? (
          <WhatsAppTextEditor
            value={currentOperacionesEtapa.mensaje || ''}
            onChange={handleOnChange}
          />
        ) : (
          <HtmlEditor
            value={currentOperacionesEtapa.mensaje || ''}
            onChange={handleOnChange}
          />
        )}


      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onSubmit} color="primary" disabled={modalLoading}>
          {modalLoading ? <CircularProgress size={24} /> : editMode ? 'Actualizar' : 'Agregar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OperacionesEtapaModal;
