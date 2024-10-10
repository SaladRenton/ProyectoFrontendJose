import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress, FormHelperText } from '@mui/material';
import axios from 'axios';

interface FormComboProps {
    operacion_id: string;
    value: string;
    onChange: (value: string) => void;
    label?: string;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

const FormCombo: React.FC<FormComboProps> = ({ operacion_id, value, onChange, label = 'Formulario' }) => {
    const [formularios, setFormularios] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Función para obtener los formularios filtrados por operacion_id
    const fetchFormularios = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/formularios`, {
                params: {
                    filter: {
                        operacion_id: operacion_id
                    },
                    per_page: 200
                }
            });
            setFormularios(response.data.data);
            setError(null); // Limpiar errores previos
        } catch (error: any) {
            setError('Error al cargar los formularios.');
            setFormularios([]);
        }
        setLoading(false);
    };

    // useEffect para llamar a la API cuando operacion_id cambia
    useEffect(() => {
        if (operacion_id) {
            fetchFormularios();
        }
    }, [operacion_id]);

    return (
        <FormControl fullWidth error={!!error}>
            <InputLabel>{label}</InputLabel>
            {loading ? (
                <CircularProgress size={24} />
            ) : (
                <>
                    <Select
                        value={value}
                        onChange={(e) => onChange(e.target.value as string)}
                        label={label}
                    >
                        {formularios.map((formulario) => (
                            <MenuItem key={formulario.id} value={formulario.id}>
                                {formulario.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {error && <FormHelperText>{error}</FormHelperText>}
                </>
            )}
        </FormControl>
    );
};

export default FormCombo;
