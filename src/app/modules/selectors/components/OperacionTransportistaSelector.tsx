import React, { useState, useEffect } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, CircularProgress, Checkbox, ListItemText, SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import OperacionCombo from '../../combos/components/OperacionCombo';

interface OperacionTransportistaSelectorProps {
  operacionId: number | null;
  onOperacionChange: (id: number) => void;
  onTransportistasChange: (ids: number[]) => void;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

const OperacionTransportistaSelector: React.FC<OperacionTransportistaSelectorProps> = ({ operacionId, onOperacionChange, onTransportistasChange }) => {
  const [transportistas, setTransportistas] = useState<{ id: number, razon_social: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTransportistas, setSelectedTransportistas] = useState<number[]>([]);

  useEffect(() => {
    const fetchTransportistas = async () => {
      if (operacionId !== null) {
        setLoading(true);
        try {
          const response = await axios.get(`${API_URL}/operaciones/${operacionId}/transportistas`);
          setTransportistas(response.data || []);
        } catch (error) {
          console.error("Error fetching transportistas", error);
          setTransportistas([]);
        }
        setLoading(false);
      }
    };

    fetchTransportistas();
  }, [operacionId]);

  const handleTransportistasChange = (event: SelectChangeEvent<number[]>) => {
    const selectedIds = event.target.value as number[];
    if (selectedIds.includes(-1)) {
      if (selectedIds.length === transportistas.length + 1) {
        setSelectedTransportistas([]);
        onTransportistasChange([]);
      } else {
        const allIds = transportistas.map((t) => t.id);
        setSelectedTransportistas(allIds);
        onTransportistasChange(allIds);
      }
    } else {
      setSelectedTransportistas(selectedIds);
      onTransportistasChange(selectedIds);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <OperacionCombo
          value={operacionId?.toString() || ''}
          onChange={(id) => onOperacionChange(Number(id))}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth margin="dense">
          <InputLabel>Transportistas</InputLabel>
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            <Select
              multiple
              value={selectedTransportistas}
              onChange={handleTransportistasChange}
              renderValue={(selected) => {
                if ((selected as number[]).includes(-1) && (selected as number[]).length === transportistas.length + 1) {
                  return 'Todos';
                }
                return transportistas
                  .filter((t) => (selected as number[]).includes(t.id))
                  .map((t) => t.razon_social)
                  .join(', ');
              }}
            >
             
              {transportistas.map((transportista) => (
                <MenuItem key={transportista.id} value={transportista.id}>
                  <Checkbox checked={selectedTransportistas.includes(transportista.id)} />
                  <ListItemText primary={transportista.razon_social} />
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default OperacionTransportistaSelector;
