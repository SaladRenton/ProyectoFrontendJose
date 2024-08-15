import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material/Select';

interface ContactAttemptsTypeComboProps {
  value: string;
  onChange: (value: string) => void;
}

const API_URL = import.meta.env.VITE_APP_API_URL;



const ContactAttemptsTypeCombo: React.FC<ContactAttemptsTypeComboProps> = ({ value, onChange }) => {
  const [types, setTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTypes = async () => {
      setLoading(true);
      try {
     //   const cachedTypes = localStorage.getItem('contact-attempts-types');
     const cachedTypes = false;
        if (cachedTypes) {
          setTypes(JSON.parse(cachedTypes));
        } else {
          const response = await axios.get(`${API_URL}/contact-attempts-types`);
          const TypesData = response.data.data || [];
          setTypes(TypesData);
        //  localStorage.setItem('contact-attempts-types', JSON.stringify(TypesData));
        }
      } catch (error) {
        console.error("Error fetching Types", error);
        setTypes([]);
      }
      setLoading(false);
    };

    fetchTypes();
  }, []);


  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value as string;
    onChange(selectedValue);
  };

  return (
    <FormControl fullWidth margin="dense">
      <InputLabel>Tipo de Contacto</InputLabel>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <Select
          value={value}
          onChange={handleSelectChange}
          label="Tipo Contacto"
        >
          {types.map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {type.descripcion}
            </MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
};

export default ContactAttemptsTypeCombo;