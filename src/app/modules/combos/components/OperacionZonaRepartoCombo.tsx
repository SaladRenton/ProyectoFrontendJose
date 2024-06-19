import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import axios from 'axios';

interface OperacionZonaRepartoComboProps {
  operacionId: string;
  value: string;
  onChange: (value: string) => void;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

const OperacionZonaRepartoCombo: React.FC<OperacionZonaRepartoComboProps> = ({ operacionId, value, onChange }) => {
  const [zonas, setZonas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchZonas = async () => {
      if (!operacionId) return;

      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/operacion-zona-reparto`, {
          params: {
            filter: {
              operacion_id: operacionId
            },
            include: 'zonaReparto'
          }
        });
        setZonas(response.data.data || []);
      } catch (error) {
        console.error("Error fetching zonas de reparto", error);
        setZonas([]);
      }
      setLoading(false);
    };

    fetchZonas();
  }, [operacionId]);

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValue = event.target.value as string;
    onChange(selectedValue);
  };

  return (
    <FormControl fullWidth margin="dense" disabled={!operacionId}>
      <InputLabel>Zona de Reparto</InputLabel>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <Select
          value={value}
          onChange={handleSelectChange}
          label="Zona de Reparto"
        >
          {zonas.map((zona) => (
            <MenuItem key={zona.id} value={zona.id}>
              {zona.zona_reparto.nombre}
            </MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
};

export default OperacionZonaRepartoCombo;
