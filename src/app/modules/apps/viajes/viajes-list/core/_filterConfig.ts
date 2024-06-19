export interface FilterConfig {
    field: string;
    headerName: string;
    enabled: boolean;
  }
  
  export const filterConfig: FilterConfig[] = [
    { field: 'razon_social', headerName: 'Razon Social', enabled: true },
    { field: 'email', headerName: 'Email', enabled: true },
    { field: 'nombre', headerName: 'Nombre', enabled: true },
    { field: 'apellido', headerName: 'Apellido', enabled: true },
    { field: 'calle', headerName: 'Calle', enabled: false },
    { field: 'numero_calle', headerName: 'Nro. Calle', enabled: false },
    { field: 'piso', headerName: 'Piso', enabled: false },
    { field: 'dpto', headerName: 'Dpto', enabled: false },
    { field: 'tel', headerName: 'Tel.', enabled: false },
    { field: 'cuit', headerName: 'Cuit.', enabled: true },
  ];
  