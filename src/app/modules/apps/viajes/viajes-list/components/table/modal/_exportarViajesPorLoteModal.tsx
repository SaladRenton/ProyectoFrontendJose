// components/table/modal/ExportarViajesPorLoteModal.tsx

import React from 'react';
import FilterModal from './_filterModal';

interface ExportarViajesPorLoteModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (filters: Record<string, string | number | boolean | string[] | null>) => void;
  loading: boolean;
  errors: string[];
}

const ExportarViajesPorLoteModal: React.FC<ExportarViajesPorLoteModalProps> = ({ open, onClose, onSubmit, loading, errors }) => {
  

  return (
    <FilterModal
        open={open}
        onClose={onClose}
        onApply={onSubmit}
        title = "Exportar Viajes en formato Excel"
        buttonTitle = "Exportar"
        filtrosObligatorios={['operacion_id']}
        loading={loading}
      />
  );
};

export default ExportarViajesPorLoteModal;
