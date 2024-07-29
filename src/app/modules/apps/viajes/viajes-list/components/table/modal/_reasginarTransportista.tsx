import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress,Typography  } from '@mui/material';
import OperacionCombo from '../../../../../../combos/components/OperacionCombo';
import TransportistaCombo from '../../../../../../combos/components/TransportistaCombo';
import { reasignarViajes } from '../../../core/_requests'; // Ajusta la ruta según tu estructura

interface ReasignarTransportistaModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void; // Callback para refrescar los datos después de la acción exitosa
  filters: Record<string, string | boolean | number | string[]>; // Filtros del modal de filtros
}

const ReasignarTransportistaModal: React.FC<ReasignarTransportistaModalProps> = ({ open, onClose, onSuccess, filters }) => {
  const [operacionId, setOperacionId] = useState<number | string>('');
  const [personaIdDestino, setPersonaIdDestino] = useState<number | string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleApply = async () => {
    if (!operacionId || !personaIdDestino) {
      setError('Debe seleccionar una operación y un transportista.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const requestData = {
        ...filters,
        persona_id_destino: personaIdDestino,
      };

      await reasignarViajes(requestData);
      onSuccess(); // Refresca los datos después de la acción exitosa
      onClose(); // Cierra el modal
    } catch (error) {
      setError('Error reasignando los viajes.');
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reasignación de Viajes (No Entregados) a Transportistas</DialogTitle>
   
      <DialogContent>
      <Typography variant="body2" color="textSecondary">
          Siga los siguientes pasos para reasignar los viajes:
        </Typography>
        <ol style={{ fontSize: '0.9rem', margin: '10px 0' }}>
          <li>Primero debe filtrar los datos deseados usando los filtros del listado</li>
          <li>Asegurese que ingreso los filtros correctos. Ingrese aplicar</li>
          <li>Revise los resultados</li>
          <li>La reasignacion se hara a todo los resultados de la consulta sin importar si esta paginado o no, salvo que su estado se Entregado</li>
          <li>Elija la operacion,el transportista destino y presione aplicar</li>

        </ol>
        <OperacionCombo
          value={operacionId}
          onChange={(value) => setOperacionId(value)}
        />
        <TransportistaCombo
          value={personaIdDestino as string}
          onChange={(value) => setPersonaIdDestino(value)}
        />
        {error && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            {error}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={handleApply} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Aplicar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReasignarTransportistaModal;
