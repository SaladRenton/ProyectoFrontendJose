import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material/Select';

interface Role {
  id: number;
  name: string;
}

interface RolesComboProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

const RolesCombo: React.FC<RolesComboProps> = ({ value, onChange,disabled }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/roles`);
        setRoles(response.data.data || []);
      } catch (error) {
        console.error("Error fetching roles", error);
      }
      setLoading(false);
    };

    fetchRoles();
  }, []);

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    onChange(event.target.value as number);
  };

  return (
    <FormControl fullWidth margin="dense">
      <InputLabel>Rol</InputLabel>
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <Select
          value={value}
          onChange={handleSelectChange}
          label="Rol"
          disabled ={disabled?disabled:false}
        >
          {roles.map((role) => (
            <MenuItem key={role.id} value={role.id}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
};

export default RolesCombo;
