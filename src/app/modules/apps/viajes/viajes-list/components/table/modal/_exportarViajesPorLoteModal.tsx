// components/table/modal/ExportarViajesPorLoteModal.tsx

import React from 'react';
import FilterModal from './_filterModal';

interface ExportarViajesPorLoteModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (filters: Record<string, string | boolean | number | string[]>) => void;
  loading: boolean;
  errors: string[];
}

const ExportarViajesPorLoteModal: React.FC<ExportarViajesPorLoteModalProps> = ({ open, onClose, onSubmit, loading, errors }) => {
  

  return (
    <FilterModal
        open={open}
        onClose={onClose}
        onApply={onSubmit}
        title = "Exportar XLS de viajes"
        buttonTitle = "Exportar"
      />
  );
};

export default ExportarViajesPorLoteModal;
