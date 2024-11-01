// components/table/modal/ExportarPaquetesModal.tsx

import React from 'react';
import FilterModal from './_filterModal';

interface ExportarPaquetesModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (filters: Record<string, string | boolean | number | string[]>) => void;
  loading: boolean;
  errors: string[];
}

const ExportarPaquetesModal: React.FC<ExportarPaquetesModalProps> = ({ open, onClose, onSubmit, loading, errors }) => {
  

  return (
    <FilterModal
        open={open}
        onClose={onClose}
        onApply={onSubmit}
        title = "Exportar paquetes formato Excel"
        buttonTitle = "Exportar"
        filtrosObligatorios={['operacion_id']}
        loading={loading}
      />
  );
};

export default ExportarPaquetesModal;
