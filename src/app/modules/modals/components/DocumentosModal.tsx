import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { ViajeModel } from '../../apps/viajes/viajes-list/core/_models';

interface Documento {
    id: number;
    viaje_id: number;
    tipo: string;
    nombre: string;
    created_at: string;
    updated_at: string;
    path: string;
}

const API_URL = import.meta.env.VITE_APP_API_URL;


interface DocumentosModalProps {
    open: boolean;
    onClose: () => void;
    viajeId: number;
    currentViaje: ViajeModel | null
}

const DocumentosModal: React.FC<DocumentosModalProps> = ({ open, onClose, viajeId ,currentViaje}) => {
    const [documentos, setDocumentos] = useState<Documento[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      //  console.log(currentViaje);
        if (open) {
            fetchDocumentos();
        }
    }, [open]);

    const fetchDocumentos = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/viajes/${viajeId}/documentos`);
            setDocumentos(response.data);
            setError(null);
        } catch (err) {
            setError('Error fetching documentos');
        } finally {
            setLoading(false);
        }
    };

    const downloadDocumento = async (documentoId: number,name:string,viaje: ViajeModel) => {
        try {
            
            const response = await axios.get(`${API_URL}/documentos/${documentoId}/download`, {
                responseType: 'blob',
            });
         

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', currentViaje?currentViaje.id_identificacion_externo.toString()+'-'+currentViaje.id_identificador_cliente_externo.toString()+'-'+currentViaje.fecha_fin+'.jpg':'nn'); // O el nombre que desees
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            setError('Error downloading documento');
        }
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'tipo', headerName: 'Tipo', width: 150 },
        { field: 'nombre', headerName: 'Nombre', width: 300 },
        { field: 'created_at', headerName: 'Fecha de Creación', width: 200, valueGetter: (params) => new Date(params.row.created_at).toLocaleString() },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 150,
            renderCell: (params) => (
                <IconButton onClick={() => downloadDocumento(params.row.id,params.row.nombre,params.row.viaje)}>
                    <DownloadIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Documentos del Viaje</DialogTitle>
            <DialogContent>
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <div>{error}</div>
                ) : (
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={documentos} columns={columns} pageSize={5} rowsPerPageOptions={[5, 10, 20]} />
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

export default DocumentosModal;
