import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid } from '@mui/material';
import { ViajeModel } from '../../../core/_models';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Ajustar la configuración de los iconos por defecto de Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Fix the default icon issue with Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface DireccionModalProps {
  open: boolean;
  onClose: () => void;
  viaje: ViajeModel | null;
}

const DireccionModal: React.FC<DireccionModalProps> = ({ open, onClose, viaje }) => {
  if (!viaje) return null;

  const { latitud, longitud } = viaje;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Información de Dirección</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Dirección"
              fullWidth
              value={viaje.direccion}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Calle"
              fullWidth
              value={viaje.calle}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Número"
              fullWidth
              value={viaje.numero}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Piso/Dpto"
              fullWidth
              value={viaje.piso_dpto}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Entre Calle 1"
              fullWidth
              value={viaje.entre_calle_1}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Entre Calle 2"
              fullWidth
              value={viaje.entre_calle_2}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Código Postal"
              fullWidth
              value={viaje.codigo_postal}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Partido"
              fullWidth
              value={viaje.partido}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Localidad"
              fullWidth
              value={viaje.localidad}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="ID Localidad"
              fullWidth
              value={viaje.id_localidad}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Latitud"
              fullWidth
              value={viaje.latitud}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Longitud"
              fullWidth
              value={viaje.longitud}
              disabled
            />
          </Grid>
        </Grid>
        <div style={{ height: '400px', width: '100%', marginTop: '20px' }}>
          <MapContainer center={[latitud, longitud]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latitud, longitud]}>
              <Popup>
                Ubicación del viaje.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DireccionModal;
