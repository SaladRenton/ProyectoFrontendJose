import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress,FormHelperText } from '@mui/material';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material/Select';


interface OperacionComboProps {
  value: string | number | boolean | string[];
  onChange: (value: string | number | boolean | string[]) => void;
  error?: boolean; // Nuevo prop para indicar si hay un error
  helperText?: string; // Nuevo prop para mostrar el mensaje de error
  label?: string;

}

const API_URL = import.meta.env.VITE_APP_API_URL;

const OperacionCombo: React.FC<OperacionComboProps> = ({ value, onChange, error, helperText, label }) => {
  const [operaciones, setOperaciones] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchOperaciones = async () => {
      setLoading(true);
      try {
        // const cachedOperaciones = localStorage.getItem('operaciones');
        const cachedOperaciones = false;
        if (cachedOperaciones) {
          setOperaciones(JSON.parse(cachedOperaciones));
        } else {
          const response = await axios.get(`${API_URL}/operaciones`, {
            params: {
              filter: {
                activo: 1
              }
            }
          });
          const operacionesData = response.data.data || [];
          setOperaciones(operacionesData);
          //  localStorage.setItem('operaciones', JSON.stringify(operacionesData));
        }
      } catch (error) {
        console.error("Error fetching operaciones", error);
        setOperaciones([]);
      }
      setLoading(false);
    };

    fetchOperaciones();
  }, []);

  const handleSelectChange = (event: SelectChangeEvent<string | boolean | number | string[]>) => {

    const selectedValue = event.target.value as string;
    onChange(selectedValue);
  };

  return (
    <FormControl fullWidth margin="dense" error={error}>
      <InputLabel>{label ? label : 'Operación'}</InputLabel>


      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <>
          <Select
            value={value}
            onChange={handleSelectChange}
            label="Operación"
          >
            {operaciones.map((operacion) => (
              <MenuItem key={operacion.id} value={operacion.id}>
                {operacion.d_operacion}
              </MenuItem>
            ))}
          </Select>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </>

      )}
    </FormControl>
  );
};

export default OperacionCombo;