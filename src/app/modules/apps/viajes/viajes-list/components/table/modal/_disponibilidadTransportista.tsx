import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress, TextField, Grid, Chip, Tooltip } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import OperacionTransportistaSelector from '../../../../../../selectors/components/OperacionTransportistaSelector';
import ErrorIcon from '@mui/icons-material/Error';
import { format, eachDayOfInterval } from 'date-fns';

interface TransportistaDisponibilidadProps {
  open: boolean;
  onClose: () => void;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

const TransportistaDisponibilidad: React.FC<TransportistaDisponibilidadProps> = ({ open, onClose }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [operacionId, setOperacionId] = useState<number | null>(null);
  const [transportistaIds, setTransportistaIds] = useState<number[]>([]);
  const [transportistas, setTransportistas] = useState<any[]>([]);
  const [fechaInicio, setFechaInicio] = useState<string>('');
  const [fechaFin, setFechaFin] = useState<string>('');

  const fetchDisponibilidad = async () => {
    if (operacionId && transportistaIds.length > 0 && fechaInicio && fechaFin) {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/disponibilidad-transportistas`, {
          params: {
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
            transportista_id: transportistaIds.join(','), // Comma-separated list of transportista IDs
            operacion_id: operacionId,
          },
        });

        const dateRange = eachDayOfInterval({
          start: new Date(fechaInicio),
          end: new Date(fechaFin),
        });
        const disponibilidadMap = new Map<string, any>(); // T


        

        // const fetchedEvents = response.data.map((item: any) => {
        //   const { transportista, disponibilidad } = item;
        //   return disponibilidad.map((disp: any) => ({
        //     title: `${disp.disponibilidad}`,
        //     start: disp.fecha,
        //     end: disp.fecha,
        //     allDay: true,
        //     backgroundColor: transportista.color || '#000000', // Fallback color
        //     borderColor: transportista.color || '#000000', // Fallback color
        //     transportistaId: transportista.id,
        //   }));
        // }).flat();


       

        const fetchedEvents = response.data.flatMap((item: any) => {
          const { transportista, disponibilidad } = item;
          disponibilidad?.forEach((disp: any) => {
            const key = `${transportista.id}-${disp.fecha}`;
            disponibilidadMap.set(key, disp);
          });
          return disponibilidad?.map((disp: any) => ({
            title: `${disp.disponibilidad}`,
            start: disp.fecha,
            end: disp.fecha,
            allDay: true,
            backgroundColor: transportista.color || '#000000',
            borderColor: transportista.color || '#000000',
            transportistaId: transportista.id,
          })).flat();
        });

        const initialEvents =  response.data.flatMap((item: any) => {
          const { transportista, disponibilidad } = item;
          return dateRange.map((date) => {
            const formattedDate = format(date, 'yyyy-MM-dd');
            const key = `${transportista.id}-${formattedDate}`;


            if (!disponibilidadMap.has(key)) {
              return {
                title: `${transportista.capacidad_maxima}`,
                start: formattedDate,
                end: formattedDate,
                allDay: true,
                backgroundColor: transportista.color || '#000000', // Fallback color
                borderColor: transportista.color || '#000000', // Fallback color
                transportistaId: transportista.id,
              };
            }
            
          
          }).filter(Boolean);
        });

        setTransportistas(response.data.map((item: any) => ({
          ...item.transportista,
          error: item.error || null,
        })));
     
        setEvents([...initialEvents, ...fetchedEvents]);
      } catch (error) {
        console.error("Error fetching disponibilidad", error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchDisponibilidad();
    }
  }, [open, operacionId, transportistaIds, fechaInicio, fechaFin]);

  const handleOperacionChange = async (id: number) => {
    setOperacionId(id);
    try {
      const response = await axios.get(`${API_URL}/operaciones/${id}`);
      const operacion = response.data;
      setFechaInicio(operacion.fecha_inicio || '');
      setFechaFin(operacion.fecha_fin || '');
    } catch (error) {
      console.error("Error fetching operacion data", error);
    }
  };

  const handleTransportistasChange = (ids: number[]) => {
    //fetchDisponibilidad();
    setTransportistaIds(ids);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Disponibilidad de Transportistas</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <OperacionTransportistaSelector
              operacionId={operacionId}
              onOperacionChange={handleOperacionChange}
              onTransportistasChange={handleTransportistasChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} sx={{ padding: 1 }}>
              <Grid item xs={6}>
                <TextField
                  label="Fecha Inicio"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Fecha Fin"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
       
         
            {transportistas.length > 0 && transportistas.map((transportista) => (
              <Tooltip key={transportista.id} title={transportista.error || ''} arrow>
                <Chip
                  label={transportista.razon_social}
                  sx={{
                    backgroundColor: transportista.error ? '#ffcccb' : transportista.color || '#000000',
                    color: 'white'
                  }}
                  icon={transportista.error ? <ErrorIcon /> : undefined}
                />
              </Tooltip>
            ))}
          </Grid>
        </Grid>
        {loading ? (
          <CircularProgress />
        ) : (
          <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
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
          </div>
        )}
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