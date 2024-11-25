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
  estado_id_origen: string;
  operacion_id: string;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

const EstadoOrigenDestinoCombo: React.FC<EstadosComboProps> = ({ value, onChange, error, helperText, label, estado_id_origen, operacion_id }) => {
  const [estados, setEstados] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log(value);
    const fetchEstados = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/estados-habilitados`, {
          params: {
            'filter[estado_id_origen]': estado_id_origen,
            'filter[operacion_id]': operacion_id,
            per_page: 200,
            include: 'estadoDestino,contactAttemptType'
          }
        });
        setEstados(response.data.data || []);
      } catch (error) {
        console.error("Error fetching estados", error);
        setEstados([]);
      }
      setLoading(false);
    };

    fetchEstados();
  }, [estado_id_origen, operacion_id]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value as string;
    onChange(selectedValue);
  };

  return (
    <FormControl fullWidth margin="dense" error={error}>
      <InputLabel>{label ? label : 'Estado'}</InputLabel>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <>
          <Select
            value={value}
            onChange={handleSelectChange}
            label={label ? label : 'Estado'}
          >
            {estados.map((estado,index) => (
              <MenuItem key={`${estado.estado_destino.id}-${index}`} value={estado.id}>
                {estado.estado_destino.d_estado}-{estado.contact_attempt_type.descripcion}
              </MenuItem>
            ))}
          </Select>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </>
      )}
    </FormControl>
  );
};

export default EstadoOrigenDestinoCombo;
