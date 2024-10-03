import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, Button, FormControl, InputLabel, TextField } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importar estilos de Quill

interface HtmlEditorProps {
  value: string;
  onChange: (value: string) => void;
  
}

const variables = [
  { name: 'Nombre', value: '{nombre}' },
  { name: 'Apellido', value: '{apellido}' },
  { name: 'Teléfono', value: '{telefono}' },
  { name: 'Cantidad ', value: '{cantidad}' },
  { name: 'Link formulario de contacto', value: '{link_formulario}' }, // Nueva variable
  { name: 'Número de cliente', value: '{numero_cliente}' }, // Nueva variable
];

const HtmlEditor: React.FC<HtmlEditorProps> = ({ value, onChange}) => {
  const [htmlContent, setHtmlContent] = useState<string>(value);
  const [selectedVariable, setSelectedVariable] = useState<string>('');

  // Inserta la variable seleccionada en el contenido
  const handleInsertVariable = () => {
    if (selectedVariable) {
      const updatedContent = `${htmlContent} ${selectedVariable}`;
      setHtmlContent(updatedContent);
      onChange(updatedContent); // Actualiza el contenido en el componente padre
    }
  };

  // Maneja el cambio del combo de selección de variables
  const handleVariableChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedVariable(event.target.value as string);
  };

  return (
    <Box>
    

      {/* Campo para el Asunto del correo */}
      
        <Typography variant="body1" gutterBottom>
        Selecciona una variable para insertar en el contenido:
      </Typography>

      {/* Combo para seleccionar variables */}
      <FormControl fullWidth margin="dense">
        <InputLabel>Variables</InputLabel>
        <Select
          value={selectedVariable}
          onChange={handleVariableChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Elige una variable
          </MenuItem>
          {variables.map((variable) => (
            <MenuItem key={variable.value} value={variable.value}>
              {variable.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button onClick={handleInsertVariable} variant="contained" color="primary" sx={{ mt: 2 }}>
        Insertar Variable
      </Button>

      <Box sx={{ mt: 3, height: '400px' }}> {/* Aumenta la altura del editor */}
        <ReactQuill
          value={htmlContent}
          onChange={(content) => {
            setHtmlContent(content);
            onChange(content); // Pasa el valor actualizado al componente padre
          }}
          style={{ height: '100%' }}  // Hace que el editor ocupe todo el espacio disponible
        />
      </Box>
    </Box>
  );
};

export default HtmlEditor;
