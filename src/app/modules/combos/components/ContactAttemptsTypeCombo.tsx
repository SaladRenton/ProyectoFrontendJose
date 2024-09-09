import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress, FormHelperText, Checkbox, ListItemText } from '@mui/material';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material/Select';

interface ContactAttemptsTypesComboProps {
  value: string[]; // Ahora es un array para manejar valores múltiples
  onChange: (value: string[]) => void;
  error?: boolean;
  helperText?: string;
  label?: string;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

const fetchContactAttemptsTypes = async () => {
  const response = await axios.get(`${API_URL}/contact-attempts-types`, {
    params: {
      per_page: 200
    }
  });
  return response.data.data || [];
};

const ContactAttemptsTypesCombo: React.FC<ContactAttemptsTypesComboProps> = ({ value, onChange, error, helperText, label }) => {
  const [types, setContactAttemptsTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    //const cachedContactAttemptsTypes = localStorage.getItem('contact-attempts-types');
    const cachedContactAttemptsTypes = false;
    if (cachedContactAttemptsTypes) {
      setContactAttemptsTypes(JSON.parse(cachedContactAttemptsTypes));
    } else {
      const fetchAndCacheContactAttemptsTypes = async () => {
        setLoading(true);
        try {
          const contactAttemptsTypesData = await fetchContactAttemptsTypes();
          setContactAttemptsTypes(contactAttemptsTypesData);
          localStorage.setItem('contact-attempts-types', JSON.stringify(contactAttemptsTypesData));
        } catch (error) {
          console.error("Error fetching contact attempts types", error);
          setContactAttemptsTypes([]);
        }
        setLoading(false);
      };

      fetchAndCacheContactAttemptsTypes();
    }
  }, []);

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValues = event.target.value as string[];
    onChange(selectedValues);
  };

  return (
    <FormControl fullWidth margin="dense" error={error}>
      <InputLabel>{label ? label : 'Tipos de Contacto'}</InputLabel>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <>
          <Select
            multiple
            value={value}
            onChange={handleSelectChange}
            label={label ? label : 'Tipos de Contacto'}

            renderValue={(selected) => selected.map(val => {
              const type = types.find(z => z.id === val);
              return type ? type.codigo_crm : '';
            }).join(', ')}
          >
            {types.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                <Checkbox checked={value.indexOf(type.id) > -1} />
                <ListItemText primary={type.codigo_crm} />
              </MenuItem>
            ))}
          </Select>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </>
      )}
    </FormControl>
  );
};

export default ContactAttemptsTypesCombo;
