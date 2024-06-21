import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

interface TransportistaDisponibilidadProps {
  open: boolean;
  onClose: () => void;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

const TransportistaDisponibilidad: React.FC<TransportistaDisponibilidadProps> = ({ open, onClose }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [fechaInicio, setFechaInicio] = useState<string>('2024-01-01');
  const [fechaFin, setFechaFin] = useState<string>('2024-01-05');
  const [transportistaId, setTransportistaId] = useState<number>(1);
  const [operacionId, setOperacionId] = useState<number>(1);

  useEffect(() => {
    if (open) {
      fetchDisponibilidad();
    }
  }, [open, fechaInicio, fechaFin, transportistaId, operacionId]);

  const fetchDisponibilidad = async () => {
    try {
      const response = await axios.get(`${API_URL}/disponibilidad-transportistas`, {
        params: {
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
          transportista_id: transportistaId,
          operacion_id: operacionId
        }
      });
      const data = response.data;
      const eventData = data.map((item: any) => ({
        title: `Asignados: ${item.viajes_asignados}, Disponibles: ${item.disponibilidad}`,
        start: item.fecha,
        allDay: true,
        backgroundColor: item.disponibilidad > 0 ? 'green' : 'red'
      }));
      setEvents(eventData);
    } catch (error) {
      console.error('Error fetching disponibilidad', error);
      setEvents([]);
    }
  };

  const handleApplyFilters = () => {
    fetchDisponibilidad();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Disponibilidad de Transportista</DialogTitle>
      <DialogContent>
        <TextField
          label="Fecha Inicio"
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Fecha Fin"
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Transportista ID"
          type="number"
          value={transportistaId}
          onChange={(e) => setTransportistaId(Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Operación ID"
          type="number"
          value={operacionId}
          onChange={(e) => setOperacionId(Number(e.target.value))}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleApplyFilters}>
          Aplicar Filtros
        </Button>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay'
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransportistaDisponibilidad;
