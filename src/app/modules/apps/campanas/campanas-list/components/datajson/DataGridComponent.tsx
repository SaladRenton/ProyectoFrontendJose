import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridRowModes,
  GridRowModesModel,
  GridActionsCellItem,
  GridRowId,
  GridRowEditStopReasons,
  GridRenderEditCellParams,
  useGridApiContext
} from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import dataJsn from '../datajson/dataCampanasList.json'
import { PROVINCIAS } from '../datajson/provincias';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { Select, MenuItem } from '@mui/material';

// Definir interfaces para manejar la estructura anidada
interface Persona {
  id: number;
  nombre: string;
  apellido: string;
}

interface CampanaRow {
  id: number;
  nombre: string;
  color: string;
  peso: number;
  provincia?: { id: number; nombre: string }
  persona: Persona; // Objeto anidado
}

const DataGridComponent: React.FC = () => {
  const [rows, setRows] = useState<GridRowsProp<CampanaRow>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  // Componente de edición personalizado para provincias
  function ProvinciasEditCell(props: GridRenderEditCellParams) {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();

    const handleChange = (event: any) => {
      const newValue = event.target.value;
      apiRef.current.setEditCellValue({
        id,
        field,
        value: { id: newValue, nombre: PROVINCIAS.find(p => p.id === newValue)?.nombre }
      });
    };

    return (
      <Select
        value={value?.id || ''}
        onChange={handleChange}
        fullWidth
      >
        {PROVINCIAS.map((provincia) => (
          <MenuItem key={provincia.id} value={provincia.id}>
            {provincia.nombre}
          </MenuItem>
        ))}
      </Select>
    );
  }

  // Función para manejar el inicio de edición
  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.Edit }
    });
  };

  // Función para manejar guardado
  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View }
    });
  };

  // Función para manejar cancelación
  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  // Manejar detención de edición de fila
  const handleRowEditStop = (params: any, event: any) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  // Manejar el proceso de actualización de la fila
  const handleProcessRowUpdate = (
    newRow: CampanaRow,
    oldRow: CampanaRow
  ): CampanaRow => {
    const updatedRows = rows.map((row) =>
      row.id === newRow.id ? newRow : row
    );

    setRows(updatedRows);
    return newRow;
  };

  // Definición de las columnas
  const columns: GridColDef[] = [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Guardar"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancelar"
              onClick={handleCancelClick(id)}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Editar"
            onClick={handleEditClick(id)}
          />,
        ];
      },
    },
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
      editable: false
    },
    {
      field: 'nombre',
      headerName: 'Nombre Campaña',
      width: 150,
      editable: true
    },
    {
      field: 'color',
      headerName: 'Color',
      width: 150,
      editable: true
    },
    {
      field: 'peso',
      headerName: 'Peso',
      width: 150,
      editable: true,
      type: 'number'
    },
    {
      field: 'personaNombre',
      headerName: 'Nombre Persona',
      width: 150,
      editable: false,
      renderCell: (params) => {
        return params.row.persona?.nombre || 'Sin nombre';
      },
    },
    {
      field: 'personaApellido',
      headerName: 'Apellido Persona',
      width: 150,
      editable: false,
      renderCell: (params) => {
        return params.row.persona?.apellido || 'Sin apellido';
      },
    },
    {
      field: 'provincia',
      headerName: 'Provincia',
      width: 200,
      editable: true,
      renderCell: (params) => {
        // Si params.value existe y tiene una propiedad nombre, muéstrala
        // De lo contrario, muestra 'No seleccionada'
        return params.value?.nombre || 'No seleccionada';
      },
      renderEditCell: (params) => <ProvinciasEditCell {...params} />,
    }
  ];

  // Función para cargar datos del JSON
  const fetchData = async () => {
    try {
      const dataCampanasList: CampanaRow[] = dataJsn.map(item => ({
        ...item,
        persona: item.persona || { id: 0, nombre: 'Sin nombre', apellido: 'Sin apellido' },
        provincia: item.provincia || undefined
      }));

      setRows(dataCampanasList);
      setLoading(false);
    } catch (err) {
      console.error('Error al cargar los datos:', err);
      setError('Error al cargar los datos');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        loading={loading}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        processRowUpdate={handleProcessRowUpdate}
        onProcessRowUpdateError={(error) => setError(error.message)}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        sx={{
          boxShadow: 1,
          '& .MuiDataGrid-columnHeaderTitle': {
            fontSize: '1rem',
            color: 'black',
            fontWeight: 600,
            textTransform: 'uppercase',
          },
        }}
      />
    </div>
  );
};

export default DataGridComponent;