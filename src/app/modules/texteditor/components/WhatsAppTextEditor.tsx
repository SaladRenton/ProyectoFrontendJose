import React, { useState } from 'react';
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

// Funciones para formatear el texto al estilo WhatsApp
const applyBold = (text: string) => `*${text}*`;
const applyItalic = (text: string) => `_${text}_`;
const applyStrikethrough = (text: string) => `~${text}~`;

interface WhatsAppTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

// Lista de variables disponibles para insertar
const variables = [
  { name: 'Nombre', value: '{nombre}' },
  { name: 'Apellido', value: '{apellido}' },
  { name: 'Email', value: '{email}' },
  { name: 'Teléfono', value: '{telefono}' },
  { name: 'Número de Cliente', value: '{numero_cliente}' },
  { name: 'Link Formulario de Contacto', value: '{link_formulario}' },
];

const WhatsAppTextEditor: React.FC<WhatsAppTextEditorProps> = ({ value, onChange }) => {
  const [editorText, setEditorText] = useState<string>(value);
  const [selectedVariable, setSelectedVariable] = useState<string>(''); // Estado para la variable seleccionada

  // Función para manejar cambios en el texto
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedText = event.target.value;
    setEditorText(updatedText);
    onChange(updatedText); // Llama al prop onChange para actualizar el valor en el componente padre
  };

  // Función para aplicar formato al texto seleccionado
  const applyFormatting = (formatter: (text: string) => string) => {
    const selectionStart = (document.getElementById('whatsapp-editor') as HTMLInputElement)?.selectionStart || 0;
    const selectionEnd = (document.getElementById('whatsapp-editor') as HTMLInputElement)?.selectionEnd || 0;
    
    if (selectionStart === selectionEnd) return; // Si no hay texto seleccionado, no aplica formato

    const selectedText = editorText.slice(selectionStart, selectionEnd);
    const formattedText = formatter(selectedText);

    const updatedText = `${editorText.slice(0, selectionStart)}${formattedText}${editorText.slice(selectionEnd)}`;
    setEditorText(updatedText);
    onChange(updatedText);
  };

  // Función para insertar la variable seleccionada en el texto
  const handleInsertVariable = () => {
    if (selectedVariable) {
      const selectionStart = (document.getElementById('whatsapp-editor') as HTMLInputElement)?.selectionStart || 0;
      const updatedText = `${editorText.slice(0, selectionStart)} ${selectedVariable} ${editorText.slice(selectionStart)}`;
      setEditorText(updatedText);
      onChange(updatedText); // Actualiza el contenido en el componente padre
      setSelectedVariable(''); // Limpia la variable seleccionada
    }
  };

  // Maneja el cambio de variable seleccionada en el combo
  const handleVariableChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedVariable(event.target.value as string);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        id="whatsapp-editor"
        label="Mensaje de WhatsApp"
        fullWidth
        multiline
        rows={6} // Altura ajustada para ser más alta que un campo de texto normal
        value={editorText}
        onChange={handleTextChange}
        variant="outlined"
      />

      <Box sx={{ mt: 1 }}>
        <Button variant="contained" onClick={() => applyFormatting(applyBold)} sx={{ mr: 1 }}>
          Negrita
        </Button>
        <Button variant="contained" onClick={() => applyFormatting(applyItalic)} sx={{ mr: 1 }}>
          Cursiva
        </Button>
        <Button variant="contained" onClick={() => applyFormatting(applyStrikethrough)}>
          Tachado
        </Button>
      </Box>

      {/* Combo para seleccionar variables */}
      <FormControl fullWidth margin="dense" sx={{ mt: 2 }}>
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
        <Button onClick={handleInsertVariable} variant="contained" color="primary" sx={{ mt: 2 }}>
          Insertar Variable
        </Button>
      </FormControl>
    </Box>
  );
};

export default WhatsAppTextEditor;
