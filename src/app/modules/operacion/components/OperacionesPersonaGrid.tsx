import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CircularProgress, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchOperacionPersona, deleteOperacionPersona } from '../../apps/operaciones/operaciones-list/core/_requests';
import { esES  } from '@mui/x-data-grid/locales';
import { useParams } from 'react-router-dom'


interface OperacionPersonaGridProps {
 
}

const OperacionPersonaGrid: React.FC<OperacionPersonaGridProps> = ({ }) => {

  const { id } = useParams()
  const operacionId = Number(id) // Convertir id a número
  
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rowCount, setRowCount] = useState<number>(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchOperacionPersona(operacionId, page, pageSize);
      setRows(data.data || []);
      setRowCount(data.total || 0);
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (operacionId) {
      fetchData();
    }
  }, [operacionId, page, pageSize]);

  const handleDelete = async () => {
    if (selectedId !== null) {
      setDeleting(true);
      try {
        await deleteOperacionPersona(selectedId);
        fetchData();
        setDeleteDialogOpen(false);
        setSelectedId(null);
      } catch (error) {
        setError('Error deleting data');
      } finally {
        setDeleting(false);
      }
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'persona.razon_social',
      headerName: 'Transportista',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.persona?.razon_social
    },
    { field: 'persona_id', headerName: 'Persona ID', width: 150, hide: true },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => { setSelectedId(params.row.id); setDeleteDialogOpen(true); }}>
          <DeleteIcon />
        </IconButton>
      )
    }
  ];

  return (

    <div style={{ height: 400, width: '100%' }}>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 20]}
          rowCount={rowCount}
          paginationMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}

        />
      )}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Deseas eliminar este transportista?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary" disabled={deleting}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus disabled={deleting}>
            {deleting ? <CircularProgress size={24} /> : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OperacionPersonaGrid;
