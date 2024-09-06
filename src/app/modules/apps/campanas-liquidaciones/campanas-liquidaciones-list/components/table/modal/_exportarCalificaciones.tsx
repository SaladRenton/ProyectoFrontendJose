// components/table/modal/ExportarCalificacionesModal.tsx

import React from 'react';
import FilterModal from './_filterModal';

interface ExportarCalificacionesModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (filters: Record<string, string | boolean | number | string[]>) => void;
  loading: boolean;
  errors: string[];
}

const ExportarCalificacionesModal: React.FC<ExportarCalificacionesModalProps> = ({ open, onClose, onSubmit, loading, errors }) => {


  return (
    <FilterModal
      open={open}
      onClose={onClose}
      onApply={onSubmit}
      title='Exportar Calificaciones en formato Excel'
      buttonTitle="Exportar"
      loading={loading}
    />
  );
};

export default ExportarCalificacionesModal;
