import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress, FormHelperText } from '@mui/material';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material/Select';

interface EtapaComboProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean; // Nuevo prop para indicar si hay un error
  helperText?: string; // Nuevo prop para mostrar el mensaje de error
  label?: string;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

const fetchEtapa = async () => {
  const response = await axios.get(`${API_URL}/etapas`, {
    params: {
      per_page: 200,
     

    }
  });
  return response.data.data || [];
};

const EtapaCombo: React.FC<EtapaComboProps> = ({ value, onChange, error, helperText ,label}) => {
  const [etapas, setEtapa] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    //const cachedEtapa = localStorage.getItem('etapas');
    const cachedEtapa = null;
    if (cachedEtapa) {
      setEtapa(JSON.parse(cachedEtapa));
    } else {
      const fetchAndCacheEtapa = async () => {
        setLoading(true);
        try {
          const etapasData = await fetchEtapa();
          setEtapa(etapasData);
         // localStorage.setItem('etapas', JSON.stringify(etapasData));
        } catch (error) {
          console.error("Error fetching Etapas", error);
          setEtapa([]);
        }
        setLoading(false);
      };

      fetchAndCacheEtapa();
    }
  }, []);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value as string;
    onChange(selectedValue);
  };

  return (
    <FormControl fullWidth margin="dense" error={error}>
      <InputLabel>{label?label:'Etapa'}</InputLabel>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <>
          <Select
            value={value}
            onChange={handleSelectChange}
            label={label?label:'Etapa'}
          >
            {etapas.map((medio) => (
              <MenuItem key={medio.id} value={medio.id}>
                {medio.nombre}
              </MenuItem>
            ))}
          </Select>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </>
      )}
    </FormControl>
  );
};

export default EtapaCombo;