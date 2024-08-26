import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { esES  } from '@mui/x-data-grid/locales';

interface PaquetesModalProps {
  open: boolean;
  onClose: () => void;
  paquetes: any[];
}

const PaquetesModal: React.FC<PaquetesModalProps> = ({ open, onClose, paquetes }) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 200 },
    { field: 'descripcion', headerName: 'Descripción', width: 200 },
    { field: 'peso', headerName: 'Peso', width: 100 },
    { field: 'mac', headerName: 'Mac', width: 200 },
    { field: 'codigo_barra', headerName: 'Código de Barra', width: 200 },
    { field: 'numero_serie', headerName: 'Número de Serie', width: 200 },
    { field: 'cantidad', headerName: 'Cantidad', width: 100 },
  ];

  const rows: GridRowsProp = paquetes.map((paquete, index) => ({ id: index, ...paquete }));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Paquetes</DialogTitle>
      <DialogContent>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5, 10, 20]}          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaquetesModal;
