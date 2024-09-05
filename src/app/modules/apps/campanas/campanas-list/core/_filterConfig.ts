export interface FilterConfig {
    field: string;
    headerName: string;
    enabled: boolean;
    placeholder?: string;
  }
  
  export const filterConfig: FilterConfig[] = [
    { field: 'nombre', headerName: 'Nombre', enabled: true },
    { field: 'viajes', headerName: 'Viaje/s', enabled: true ,placeholder: 'Ej: 1234,4444'},
  
  ];
  