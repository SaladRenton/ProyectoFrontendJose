import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';

interface Validacion {
    id: number;
    viaje_id: number;
    documento: string;
    nombre_apellido: string;
    firma: string; // Assuming this is a base64 string of the image
    created_at: string;
    updated_at: string;
}

interface ValidacionModalProps {
    open: boolean;
    onClose: () => void;
    validacion: Validacion | null;
}

const ValidacionModal: React.FC<ValidacionModalProps> = ({ open, onClose, validacion }) => {
    if (!validacion) {
        return null;
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Detalles de la Validación</DialogTitle>
            <DialogContent>
                <TextField
                    label="ID"
                    value={validacion.id}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    label="ID del Viaje"
                    value={validacion.viaje_id}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    label="Documento"
                    value={validacion.documento}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    label="Nombre y Apellido"
                    value={validacion.nombre_apellido}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <div>
                    <Typography variant="subtitle1">Firma</Typography>
                    <img src={validacion.firma} alt="Firma" style={{ width: '100%', height: 'auto', marginTop: '10px' }} />
                </div>
                <TextField
                    label="Fecha de Creación"
                    value={new Date(validacion.created_at).toLocaleString()}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    label="Fecha de Actualización"
                    value={new Date(validacion.updated_at).toLocaleString()}
                    fullWidth
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ValidacionModal;
