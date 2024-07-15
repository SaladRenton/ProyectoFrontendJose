// components/table/modal/EstadosHistoricosModal.tsx

import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { esES } from '@mui/x-data-grid/locales';
import { format } from 'date-fns';


interface ContactosHistoricosModalProps {
    open: boolean;
    onClose: () => void;
    viajeId: number | null;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

const ContactosHistoricosModal: React.FC<ContactosHistoricosModalProps> = ({ open, onClose, viajeId }) => {
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const includesConfig = {
        includes: ['medioContacto', 'type'] // Añadir cualquier otro include necesario aquí
    };

    useEffect(() => {
        const fetchContactosHistoricos = async () => {
            if (viajeId !== null) {
                setLoading(true);
                try {
                    const includeQuery = { include: includesConfig.includes.join(',') };
                    const response = await axios.get(`${API_URL}/estado-contacto`, {
                        params: {
                            'filter[viaje_id]': viajeId,
                            ...includeQuery
                        }
                    });
                    setRows(response.data.data || []);
                } catch (error) {
                    console.error("Error fetching Contactos historicos", error);
                    setRows([]);
                }
                setLoading(false);
            }
        };

        if (open) {
            fetchContactosHistoricos();
        }

        // Cleanup function to reset the state when the modal is closed
        return () => {
            setRows([]);
            setLoading(false);
        };
    }, [viajeId, open]);

    const columns: GridColDef[] = [

        {
            field: 'fecha_contacto',
            headerName: 'Fecha Contacto',
            width: 150,
            renderCell: (params) => {
                return params.value ? format(new Date(params.value), 'dd/MM/yyyy') : null;
            },
        },
        { field: 'agent_name', headerName: 'Agente', width: 150 },
        { field: 'telefono', headerName: 'Telefono', width: 150 },
        { field: 'CallID', headerName: 'call_id', width: 150 },
        {
            field: 'medio_contacto.nombre',
            headerName: 'Medio',
            width: 150,
            editable: false,
            valueGetter: (params) => params.row.medio_contacto?.nombre
        },
        {
            field: 'type.descripcion',
            headerName: 'Motivo',
            width: 150,
            editable: false,
            valueGetter: (params) => params.row.type?.descripcion
        },
    ];

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Contactos Históricos</DialogTitle>
            <DialogContent>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5, 10, 20]}

                            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
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

export default ContactosHistoricosModal;
