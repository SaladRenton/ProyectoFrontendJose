import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';

interface ZonaReparto {
  id: number;
  nombre: string;
  state: string;
}

interface ZonaRepartoComboProps {
  onChange: (value: number | string) => void;
}

const ZonaRepartoCombo: React.FC<ZonaRepartoComboProps> = ({  onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<ZonaReparto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    // Si la longitud del input es menor a 4, no buscamos
    if (inputValue.length < 4) {
      setOptions([]);
      return undefined;
    }

    const API_URL = import.meta.env.VITE_APP_API_URL;

    const fetchZonasReparto = async () => {
      setLoading(true);
      try {
        // Llamada al backend para buscar zonas reparto
        const response = await axios.get(`${API_URL}/zonas-reparto`, {
            params: {
                filter: {
                  nombre: inputValue
                },
                per_page: 200
              }
        });
        
        if (active) {
          setOptions(response.data.data || []);  // Seteamos las opciones si la llamada fue exitosa
        }
      } catch (error) {
        console.error('Error fetching zonas reparto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchZonasReparto();

    // Cleanup function
    return () => {
      active = false;
    };
  }, [inputValue]);

  return (
    <Autocomplete
      getOptionLabel={(option) => option.nombre + " - " + option.state}  // Lo que se muestra en la lista
      options={options}
      loading={loading}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);  // Actualiza el valor del input
      }}
      onChange={(event, newValue) => {
        onChange(newValue?.id);  // Pasamos el valor seleccionado al padre
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Buscar Zona Reparto"
          variant="outlined"
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default ZonaRepartoCombo;
