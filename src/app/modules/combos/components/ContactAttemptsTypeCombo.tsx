import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress, FormHelperText, Checkbox, ListItemText } from '@mui/material';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material/Select';

interface ContactAttemptsTypesComboProps {
  value: string | string[];  // Puede ser un solo valor o un array
  onChange: (value: string | number | string[] | number[]) => void;
  error?: boolean;
  helperText?: string;
  label?: string;
  multiple?: boolean; // Controla si es múltiple o no
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

const ContactAttemptsTypesCombo: React.FC<ContactAttemptsTypesComboProps> = ({ value, onChange, error, helperText, label, multiple = true }) => {
  const [types, setContactAttemptsTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAndCacheContactAttemptsTypes = async () => {
      setLoading(true);
      try {
        const contactAttemptsTypesData = await fetchContactAttemptsTypes();
        setContactAttemptsTypes(contactAttemptsTypesData);
      } catch (error) {
        console.error("Error fetching contact attempts types", error);
        setContactAttemptsTypes([]);
      }
      setLoading(false);
    };

    fetchAndCacheContactAttemptsTypes();
  }, []);

  const handleSelectChange = (event: SelectChangeEvent<string[] | string>) => {
    const selectedValue = event.target.value;

    if (multiple) {
      onChange(selectedValue as string[]);
    } else {
      onChange(selectedValue as string);
    }
  };

  const renderSelectedValue = (selected: string | string[]) => {
    if (Array.isArray(selected)) {
      return selected
        .map((val) => {
          const foundType = types.find((type) => type.id.toString() === val.toString()); // Asegúrate de comparar como string
          return foundType ? foundType.codigo_crm : '';
        })
        .join(', ');
    } else {
      const foundType = types.find((type) => type.id.toString() === selected.toString()); // Asegúrate de comparar como string
      return foundType ? foundType.codigo_crm : '';
    }
  };

  return (
    <FormControl fullWidth margin="dense" error={error}>
      <InputLabel>{label ? label : 'Calificación'}</InputLabel>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <>
          <Select
            multiple={multiple}
            value={multiple ? (value as string[]) : (value as string)} // Asegura que el valor sea un array o un string según sea múltiple o no
            onChange={handleSelectChange}
            label={label ? label : 'Calificación'}
            renderValue={(selected) => renderSelectedValue(selected)}
          >
            {types.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {multiple && <Checkbox checked={Array.isArray(value) && value.indexOf(type.id) > -1} />}
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
