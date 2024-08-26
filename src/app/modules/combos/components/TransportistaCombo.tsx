import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material/Select';


interface TransportistaComboProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

const fetchTransportistas = async () => {
  const response = await axios.get(`${API_URL}/transportistas`,{
    params: {
      per_page: 200
    }
  })
  return response.data.data || [];
};

const TransportistaCombo: React.FC<TransportistaComboProps> = ({ value, onChange,disabled }) => {
  const [transportistas, setTransportistas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    //const cachedTransportistas = localStorage.getItem('transportistas');
    const cachedTransportistas = false;
    if (cachedTransportistas) {
      setTransportistas(JSON.parse(cachedTransportistas));
    } else {
      const fetchAndCacheTransportistas = async () => {
        setLoading(true);
        try {
          const transportistasData = await fetchTransportistas();
          setTransportistas(transportistasData);
          //localStorage.setItem('transportistas', JSON.stringify(transportistasData));
        } catch (error) {
          console.error("Error fetching transportistas", error);
          setTransportistas([]);
        }
        setLoading(false);
      };

      fetchAndCacheTransportistas();
    }
  }, []);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value as string;
    onChange(selectedValue);
  };

  return (
    <FormControl fullWidth margin="dense">
      <InputLabel>Transportista</InputLabel>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <Select
          value={value}
          onChange={handleSelectChange}
          label="Transportista"
          disabled ={disabled?disabled:false}
        >
          {transportistas.map((transportista) => (
            <MenuItem key={transportista.id} value={transportista.id}>
              {transportista.razon_social}
            </MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
};

export default TransportistaCombo;
