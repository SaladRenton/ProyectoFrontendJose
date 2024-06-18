import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


// Ajustar la configuración de los iconos por defecto de Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface OpenStreetMapModalProps {
  open: boolean;
  onClose: () => void;
  onSelectLocation: (lat: number, lng: number) => void;
}

const OpenStreetMapModal: React.FC<OpenStreetMapModalProps> = ({ open, onClose, onSelectLocation }) => {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setLat(e.latlng.lat);
        setLng(e.latlng.lng);
      },
    });

    return lat && lng ? <Marker position={[lat, lng]} icon={new L.Icon.Default()} /> : null;
  };

  const handleConfirm = () => {
    if (lat !== null && lng !== null) {
      onSelectLocation(lat, lng);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Seleccione una Ubicación</DialogTitle>
      <DialogContent>
        <div style={{ height: '400px', width: '100%' }}>
          <MapContainer center={[-34.6037, -58.3816]} zoom={12} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
          </MapContainer>
        </div>
        <TextField
          margin="dense"
          label="Latitud"
          fullWidth
          value={lat ?? ''}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          margin="dense"
          label="Longitud"
          fullWidth
          value={lng ?? ''}
          InputProps={{
            readOnly: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} color="primary" disabled={lat === null || lng === null}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OpenStreetMapModal;
