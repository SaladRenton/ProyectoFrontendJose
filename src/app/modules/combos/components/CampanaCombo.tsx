import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress, FormHelperText } from '@mui/material';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material/Select';

interface CampanaComboProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean; // Nuevo prop para indicar si hay un error
  helperText?: string; // Nuevo prop para mostrar el mensaje de error
  label?: string;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

const fetchCampana = async () => {
  const response = await axios.get(`${API_URL}/campanas`, {
    params: {
      per_page: 200,
      filter: {
        activa: true
      }

    }
  });
  return response.data.data || [];
};

const CampanaCombo: React.FC<CampanaComboProps> = ({ value, onChange, error, helperText ,label}) => {
  const [campanas, setCampana] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    //const cachedCampana = localStorage.getItem('campanas');
    const cachedCampana = null;
    if (cachedCampana) {
      setCampana(JSON.parse(cachedCampana));
    } else {
      const fetchAndCacheCampana = async () => {
        setLoading(true);
        try {
          const campanasData = await fetchCampana();
          setCampana(campanasData);
          localStorage.setItem('campanas', JSON.stringify(campanasData));
        } catch (error) {
          console.error("Error fetching Campañas", error);
          setCampana([]);
        }
        setLoading(false);
      };

      fetchAndCacheCampana();
    }
  }, []);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value as string;
    onChange(selectedValue);
  };

  return (
    <FormControl fullWidth margin="dense" error={error}>
      <InputLabel>{label?label:'Campaña'}</InputLabel>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <>
          <Select
            value={value}
            onChange={handleSelectChange}
            label={label?label:'Campaña'}
          >
            {campanas.map((medio) => (
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

export default CampanaCombo;