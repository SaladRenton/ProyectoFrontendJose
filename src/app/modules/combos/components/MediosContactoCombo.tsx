import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress, FormHelperText } from '@mui/material';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material/Select';

interface MediosContactoComboProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean; // Nuevo prop para indicar si hay un error
  helperText?: string; // Nuevo prop para mostrar el mensaje de error
  label?: string;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

const fetchMediosContacto = async () => {
  const response = await axios.get(`${API_URL}/medios-contacto`, {
    params: {
      per_page: 200
    }
  });
  return response.data.data || [];
};

const MediosContactoCombo: React.FC<MediosContactoComboProps> = ({ value, onChange, error, helperText ,label}) => {
  const [medios, setMediosContacto] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const cachedMediosContacto = localStorage.getItem('medios-contacto');
    if (cachedMediosContacto) {
      setMediosContacto(JSON.parse(cachedMediosContacto));
    } else {
      const fetchAndCacheMediosContacto = async () => {
        setLoading(true);
        try {
          const mediosData = await fetchMediosContacto();
          setMediosContacto(mediosData);
          localStorage.setItem('medios-contacto', JSON.stringify(mediosData));
        } catch (error) {
          console.error("Error fetching Medios Contacto", error);
          setMediosContacto([]);
        }
        setLoading(false);
      };

      fetchAndCacheMediosContacto();
    }
  }, []);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value as string;
    onChange(selectedValue);
  };

  return (
    <FormControl fullWidth margin="dense" error={error}>
      <InputLabel>{label?label:'Medio'}</InputLabel>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <>
          <Select
            value={value}
            onChange={handleSelectChange}
            label={label?label:'Medio'}
          >
            {medios.map((medio) => (
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

export default MediosContactoCombo;