import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress, TextField, ListItemText, Checkbox } from '@mui/material';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material/Select';

interface OperacionZonaRepartoComboProps {
  operacionId: string;
  value: string[];
  onChange: (value: string[]) => void;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

const OperacionZonaRepartoCombo: React.FC<OperacionZonaRepartoComboProps> = ({ operacionId, value, onChange }) => {
  const [zonas, setZonas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValues = event.target.value as string[];
    
    onChange(selectedValues);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredZonas = zonas.filter(zona =>
    zona.zona_reparto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <FormControl fullWidth margin="dense" disabled={!operacionId}>
      <InputLabel>Zona de Reparto</InputLabel>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <>
          <TextField
            margin="dense"
            label="Buscar Zona"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Select
            multiple
            value={value}
            onChange={handleSelectChange}
            renderValue={(selected) => selected.map(val => {
              const zona = zonas.find(z => z.zona_reparto_id === val);
              return zona ? zona.zona_reparto.id + '-' + zona.zona_reparto.nombre + '-' + zona.zona_reparto.addresstype : '';
            }).join(', ')}
          >
            {filteredZonas.map((zona) => (
              <MenuItem key={zona.zona_reparto_id} value={zona.zona_reparto_id}>
                <Checkbox checked={value.indexOf(zona.zona_reparto_id) > -1} />
                <ListItemText primary={zona.zona_reparto.id + '-' + zona.zona_reparto.nombre + '-' + zona.zona_reparto.addresstype} />
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    </FormControl>
  );
};

export default OperacionZonaRepartoCombo;
