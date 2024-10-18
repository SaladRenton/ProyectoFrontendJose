import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress, FormHelperText } from '@mui/material';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material/Select';

interface IrregularidadComboProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean; // Nuevo prop para indicar si hay un error
  helperText?: string; // Nuevo prop para mostrar el mensaje de error
  label?: string;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

const fetchIrregularidad = async () => {
  const response = await axios.get(`${API_URL}/irregularidades`, {
    params: {
      per_page: 200
    }
  });
  return response.data.data || [];
};

const IrregularidadCombo: React.FC<IrregularidadComboProps> = ({ value, onChange, error, helperText ,label}) => {
  const [irregularidad, setIrregularidad] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
  //  const cachedIrregularidad = localStorage.getItem('irregularidad');

 //   if (cachedIrregularidad) {
  //    setIrregularidad(JSON.parse(cachedIrregularidad));
   // } else {
      const fetchAndCacheIrregularidad = async () => {
        setLoading(true);
        try {
          const irregularidadData = await fetchIrregularidad();
          setIrregularidad(irregularidadData);
         // localStorage.setItem('irregularidad', JSON.stringify(irregularidadData));
        } catch (error) {
          console.error("Error fetching irregularidad", error);
          setIrregularidad([]);
        }
        setLoading(false);
      };

      fetchAndCacheIrregularidad();
   // }
  }, []);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value as string;
    onChange(selectedValue);
  };

  return (
    <FormControl fullWidth margin="dense" error={error}>
      <InputLabel>{label?label:'Irregularidad'}</InputLabel>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <>
          <Select
            value={value}
            onChange={handleSelectChange}
            label={label?label:'Irregularidad'}
          >
            {irregularidad.map((irregularidad) => (
              <MenuItem key={irregularidad.id} value={irregularidad.id}>
                {irregularidad.descripcion}
              </MenuItem>
            ))}
          </Select>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </>
      )}
    </FormControl>
  );
};

export default IrregularidadCombo;