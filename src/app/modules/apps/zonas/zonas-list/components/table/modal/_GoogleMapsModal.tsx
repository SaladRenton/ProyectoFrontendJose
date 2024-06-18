import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapsModalProps {
  open: boolean;
  onClose: () => void;
  onSelectLocation: (lat: number, lng: number) => void;
}

const GoogleMapsModal: React.FC<GoogleMapsModalProps> = ({ open, onClose, onSelectLocation }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  useEffect(() => {
    if (open && mapRef.current) {
      const loader = new Loader({
        apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
        version: 'weekly',
      });

      loader.load().then(() => {
        const map = new google.maps.Map(mapRef.current!, {
          center: { lat: -34.6037, lng: -58.3816 }, // Buenos Aires, Argentina
          zoom: 12,
        });

        map.addListener('click', (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            setLat(lat);
            setLng(lng);
          }
        });
      });
    }
  }, [open]);

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
        <div ref={mapRef} style={{ height: '400px', width: '100%' }} />
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

export default GoogleMapsModal;
