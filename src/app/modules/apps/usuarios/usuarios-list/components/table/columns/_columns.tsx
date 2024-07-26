import { GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { UserModelWithRol } from '../../../../../../auth';


export const getColumns = (
    handleOpenEditModal: (paquete: UserModelWithRol) => void,
    handleDeleteRow: (id: number) => void
  ): GridColDef[] => [
    { field: 'id', headerName: 'ID', width: 90, editable: false },
    { field: 'name', headerName: 'Nombre', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 150, editable: true },
    {
      field: 'roles.name',
      headerName: 'Rol',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.roles[0]?.name
    },
  
 


    {
      field: 'persona.razon_social',
      headerName: 'Persona',
      width: 150,
      editable: false,
      valueGetter: (params) => params.row.persona?.razon_social
    },
   
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleOpenEditModal(params.row as UserModelWithRol)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDeleteRow(params.id as number)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];