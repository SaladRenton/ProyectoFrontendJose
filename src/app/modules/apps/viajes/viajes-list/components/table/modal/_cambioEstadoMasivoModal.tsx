import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Stepper, Step, StepLabel, Typography, Grid } from '@mui/material';
import FilterModal from './_filterModal';
import EstadoOrigenDestinoCombo from '../../../../../../combos/components/EstadoOrigenDestinoCombo';

interface CambioEstadoMasivoModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (filters: Record<string, string | boolean | number | string[]>, estado_id_destino: string) => Promise<{ message: string }>;
  loading: boolean;
  errors: string[];
}

const CambioEstadoMasivoModal: React.FC<CambioEstadoMasivoModalProps> = ({ open, onClose, onSubmit, loading, errors }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [filters, setFilters] = useState<Record<string, string | boolean | number | string[]>>({});
  const [estadoIdDestino, setEstadoIdDestino] = useState<string>('');
  const [finalMessage, setFinalMessage] = useState<string | null>(null);

  const steps = ['Instrucciones', 'Filtrar Viajes', 'Seleccionar Estado Destino', 'Resultado'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleApplyFilters = (appliedFilters: Record<string, string | boolean | number | string[]>) => {
    setFilters(appliedFilters);
    handleNext();
  };

  const handleFinalSubmit = async () => {
    try {
      const response = await onSubmit(filters, estadoIdDestino);
      setFinalMessage(response.message); // Establece el mensaje final
      handleNext(); // Avanza al paso final para mostrar el mensaje
    } catch (error) {
      console.error('Error al cambiar el estado masivamente:', error);
      setFinalMessage('Ocurrió un error al intentar cambiar los estados.');
      handleNext(); // Avanza al paso final incluso si hay un error
    }
  };

  const isEmpty = (value: string | number | boolean | string[]): boolean => {
    if (typeof value === 'string') {
      return value.trim() === '';
    } else if (typeof value === 'number') {
      return value === 0;
    } else if (typeof value === 'boolean') {
      return !value;
    } else if (Array.isArray(value)) {
      return value.length === 0;
    }
    return false;
  };

  const handleModalClose = () => {
   
  };

  const handleFinalClose = () => {
    setActiveStep(0);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Cambio Masivo de Estados</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Filtre los Viajes a los cuales quiere cambiarle el estado.
          </Typography>
        )}
        {activeStep === 1 && (
          <FilterModal
            open={open}
            onClose={handleModalClose} // Asegura que se maneje correctamente el cierre
            onApply={handleApplyFilters}
            title="Filtrar Viajes"
            buttonTitle="Aplicar Filtros"
            filtrosObligatorios={['estado_id', 'operacion_id']}
          />
        )}
        {activeStep === 2 && (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <EstadoOrigenDestinoCombo
                value={estadoIdDestino}
                onChange={setEstadoIdDestino}
                estado_id_origen={filters.estado_id as string}  // Usamos filters.estado_id como estado_id_origen
                operacion_id={filters.operacion_id as string}  // Usamos filters.operacion_id como operacion_id
                label="Estado Destino"
              />
            </Grid>
          </Grid>
        )}
        {activeStep === 3 && finalMessage && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            {finalMessage}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        {activeStep > 0 && activeStep < steps.length - 1 && (
          <Button onClick={handleBack} color="primary">
            Volver
          </Button>
        )}
        {activeStep < steps.length - 2 && (
          <Button onClick={handleNext} color="primary">
            Siguiente
          </Button>
        )}
        {activeStep === steps.length - 2 && (
          <Button onClick={handleFinalSubmit} color="primary" disabled={loading}>
            {loading ? 'Cargando...' : 'Finalizar'}
          </Button>
        )}
        {activeStep === steps.length - 1 && (
          <Button onClick={handleFinalClose} color="primary">
            Cerrar
          </Button>
        )}
        <Button onClick={handleFinalClose} color="secondary">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CambioEstadoMasivoModal;