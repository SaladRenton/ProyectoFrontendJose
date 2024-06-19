// components/table/modal/EstadosHistoricosModal.tsx

import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress } from '@mui/material';
import { DataGrid, GridRowsProp } from '@mui/x-data-grid';
import axios from 'axios';

interface EstadosHistoricosModalProps {
    open: boolean;
    onClose: () => void;
    viajeId: number | null;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

const EstadosHistoricosModal: React.FC<EstadosHistoricosModalProps> = ({ open, onClose, viajeId }) => {
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [loading, setLoading] = useState<boolean>(false);


    const includesConfig = {
        viajes: ['estadoAnterior', 'estadoNuevo'] // Añadir cualquier otro include necesario aquí
    };




    useEffect(() => {
        const fetchEstadosHistoricos = async () => {
            if (viajeId !== null) {
                setLoading(true);
                try {
                    const includeQuery = { include: includesConfig.viajes.join(',') };
                    const response = await axios.get(`${API_URL}/estado-historia`, {
                        params: {
                            viaje_id: viajeId,
                            ...includeQuery
                        }
                    });
                    setRows(response.data.data || []);
                } catch (error) {
                    console.error("Error fetching estados historicos", error);
                    setRows([]);
                }
                setLoading(false);
            }
        };

        fetchEstadosHistoricos();
    }, [viajeId]);

    const columns: GridColDef[] = [
        { field: 'fecha_cambio_estado', headerName: 'Fecha', width: 150 },

        {
            field: 'estado_anterior.d_estado',
            headerName: 'Estado Anterior',
            width: 150,
            editable: false,
            valueGetter: (params) => params.row.estado_anterior?.d_estado
        },
        {
            field: 'estado_nuevo.d_estado',
            headerName: 'Estado Nuevo',
            width: 150,
            editable: false,
            valueGetter: (params) => params.row.estado_nuevo?.d_estado
        },
    ];

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Estados Históricos</DialogTitle>
            <DialogContent>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5, 10, 20]} />
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

export default EstadosHistoricosModal;
