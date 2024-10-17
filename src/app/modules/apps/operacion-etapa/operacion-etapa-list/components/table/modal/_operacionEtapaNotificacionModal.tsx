// components/table/modal/EstadosHistoricosModal.tsx

import React from 'react';
import OperacionEtapaNotificacionsList from '../../../../../operacion-etapa-notificacion/operacion-etapa-notificacion-list/components/Grid/Grid';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress, TextField, FormControlLabel, Checkbox } from '@mui/material';
import { OperacionEtapaModel } from '../../../core/_models';


interface OperacionEtapaNotificacionModalProps {
    open: boolean;
    onClose: () => void;
    operacionEtapa: OperacionEtapaModel;
}



const OperacionEtapaNotificacionModal: React.FC<OperacionEtapaNotificacionModalProps> = ({ open, onClose, operacionEtapa }) => {



    return (

        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{'Asignar Notificaciones a la etapa'}</DialogTitle>
            <DialogContent>
                <OperacionEtapaNotificacionsList

                    operacionEtapa={operacionEtapa}
                ></OperacionEtapaNotificacionsList>

            </DialogContent>
        </Dialog>
    );
};

export default OperacionEtapaNotificacionModal;
