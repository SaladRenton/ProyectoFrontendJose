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
  
} from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import dataJsn from '../datajson/dataCampanasList.json'
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

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
  persona: Persona; // Objeto anidado
}

const DataGridComponent: React.FC = () => {
  const [rows, setRows] = useState<GridRowsProp<CampanaRow>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});


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


  
 
  

  // Definición de las columnas con soporte para objeto anidado
    // Modificar columnas para incluir acciones
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
    }
  ];

  // Función para cargar datos del JSON
  const fetchData = async () => {
    try {
      console.log('Datos JSON originales:', dataJsn);
  
      const dataCampanasList: CampanaRow[] = dataJsn.map(item => {
        console.log('Procesando item:', item);
        return {
          ...item,
          persona: item.persona || { id: 0, nombre: 'Sin nombre', apellido: 'Sin apellido' }
        };
      });
  
      console.log('Datos cargados:', dataCampanasList);
  
      setRows(dataCampanasList);
      setLoading(false);
    } catch (err) {
      console.error('Error al cargar los datos:', err);
      setError('Error al cargar los datos');
      setLoading(false);
    }
  };

  // Manejar el proceso de actualización de la fila
  const handleProcessRowUpdate = async (
    newRow: CampanaRow,
    oldRow: CampanaRow
  ): Promise<CampanaRow> => {
    try {
      // Aquí podrías hacer una llamada a tu API para guardar los cambios
      const updatedRows = rows.map((row) =>
        row.id === newRow.id ? newRow : row
      );

      setRows(updatedRows);
      return newRow;
    } catch (error) {
      console.error('Error actualizando fila:', error);
      return oldRow;
    }
  };

  // Manejar errores en la actualización de filas
  const handleProcessRowUpdateError = (error: Error) => {
    setError(error.message);
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
        onProcessRowUpdateError={handleProcessRowUpdateError}
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