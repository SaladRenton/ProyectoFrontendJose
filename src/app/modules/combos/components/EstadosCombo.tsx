import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress, FormHelperText } from '@mui/material';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material/Select';

interface EstadosComboProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean; // Nuevo prop para indicar si hay un error
  helperText?: string; // Nuevo prop para mostrar el mensaje de error
  label?: string;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

const fetchEstados = async () => {
  const response = await axios.get(`${API_URL}/estados`, {
    params: {
      per_page: 200
    }
  });
  return response.data.data || [];
};

const EstadosCombo: React.FC<EstadosComboProps> = ({ value, onChange, error, helperText ,label}) => {
  const [estados, setEstados] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const cachedEstados = localStorage.getItem('estados');
    if (cachedEstados) {
      setEstados(JSON.parse(cachedEstados));
    } else {
      const fetchAndCacheEstados = async () => {
        setLoading(true);
        try {
          const estadosData = await fetchEstados();
          setEstados(estadosData);
          localStorage.setItem('estados', JSON.stringify(estadosData));
        } catch (error) {
          console.error("Error fetching estados", error);
          setEstados([]);
        }
        setLoading(false);
      };

      fetchAndCacheEstados();
    }
  }, []);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value as string;
    onChange(selectedValue);
  };

  return (
    <FormControl fullWidth margin="dense" error={error}>
      <InputLabel>{label?label:'Estado'}</InputLabel>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <>
          <Select
            value={value}
            onChange={handleSelectChange}
            label={label?label:'Estado'}
          >
            {estados.map((estado) => (
              <MenuItem key={estado.id} value={estado.id}>
                {estado.d_estado}
              </MenuItem>
            ))}
          </Select>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </>
      )}
    </FormControl>
  );
};

export default EstadosCombo;