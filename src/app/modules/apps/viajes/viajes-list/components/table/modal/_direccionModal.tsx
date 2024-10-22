import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid } from '@mui/material';
import { ViajeModel } from '../../../core/_models';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Configuración de iconos de Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface DireccionModalProps {
  open: boolean;
  onClose: () => void;
  viaje: ViajeModel | null;
  onDireccionUpdated: () => void; // Para refrescar los datos en la lista después de actualizar
}

const DireccionModal: React.FC<DireccionModalProps> = ({ open, onClose, viaje, onDireccionUpdated }) => {
  const [direccionData, setDireccionData] = useState<ViajeModel | null>(null);
  const [newLatLng, setNewLatLng] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (viaje) {
      setDireccionData(viaje); // Inicializa con los datos del viaje al abrir el modal
    }
  }, [viaje]);

  if (!direccionData) return null;

  const { latitud, longitud, direccion, calle, numero, piso_dpto, entre_calle_1, entre_calle_2, codigo_postal, partido, localidad, id_localidad } = direccionData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDireccionData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleActualizarDireccion = async () => {
    try {
      const API_URL = import.meta.env.VITE_APP_API_URL;

      // Enviar los datos actualizados al backend
      await axios.put(`${API_URL}/viajes/${viaje?.id}/actualizar-direccion`,direccionData);
      onDireccionUpdated(); // Llama a la función para refrescar la lista
      onClose(); // Cierra el modal después de actualizar
    } catch (error) {
      console.error("Error al actualizar la dirección", error);
    }
  };

  const handleLatLongChange = () => {
    if (direccionData.latitud && direccionData.longitud) {
      setNewLatLng([Number(direccionData.latitud), Number(direccionData.longitud)]);
    }
  };

  const MapUpdater: React.FC = () => {
    const map = useMap();
    useEffect(() => {
      if (newLatLng) {
        map.setView(newLatLng, 13);
      }
    }, [newLatLng, map]);
    return null;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Información de Dirección</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
          <TextField
              margin="dense"
              label="Calle"
              fullWidth
              value={calle}
              name="calle"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
          
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Número"
              fullWidth
              value={numero}
              name="numero"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Piso/Dpto"
              fullWidth
              value={piso_dpto}
              name="piso_dpto"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Entre Calle 1"
              fullWidth
              value={entre_calle_1}
              name="entre_calle_1"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Entre Calle 2"
              fullWidth
              value={entre_calle_2}
              name="entre_calle_2"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Código Postal"
              fullWidth
              value={codigo_postal}
              name="codigo_postal"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Partido"
              fullWidth
              value={partido}
              name="partido"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Localidad"
              fullWidth
              value={localidad}
              name="localidad"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="ID Localidad"
              fullWidth
              value={id_localidad}
              name="id_localidad"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Latitud"
              fullWidth
              value={latitud || ''}
              name="latitud"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label="Longitud"
              fullWidth
              value={longitud || ''}
              name="longitud"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button onClick={handleLatLongChange} variant="contained" color="primary" fullWidth>
              Ver en Mapa
            </Button>
            <Button disabled={true} onClick={handleLatLongChange} variant="contained" color="primary" fullWidth>
              Buscar Lat/Long
            </Button>
          </Grid>
        </Grid>
        <div style={{ height: '400px', width: '100%', marginTop: '20px' }}>
          <MapContainer center={[latitud || 0, longitud || 0]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {latitud && longitud && (
              <Marker position={[latitud, longitud]}>
                <Popup>Ubicación del viaje</Popup>
              </Marker>
            )}
            {newLatLng && <Marker position={newLatLng} />}
            <MapUpdater />
          </MapContainer>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cerrar
        </Button>
        <Button onClick={handleActualizarDireccion} color="primary">
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DireccionModal;
