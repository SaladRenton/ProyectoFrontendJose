import React from 'react';
import { Modal, Box,  Button } from '@mui/material';

interface CustomModalProps {
  open: boolean; // Prop para controlar la visibilidad del modal
  onClose: () => void; // Función para cerrar el modal
  children?: React.ReactNode; // Contenido dinámico que se pasará al modal
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // Ajusta el ancho del modal a tu gusto
  width: '80%',  // Por ejemplo, 80% del ancho de la pantalla
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const CustomModal: React.FC<CustomModalProps> = ({ open, onClose, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <div> {/* Nuevo div para contener DataGridComponent */}
          {children} {/* Aquí se renderiza el contenido dinámico */}
        </div>
        <Button onClick={onClose} color="primary" variant="contained" sx={{ mt: 2 }}>
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};

export default CustomModal;