export interface FilterConfig {
    field: string;
    headerName: string;
    enabled: boolean;
  }
  
  export const filterConfig: FilterConfig[] = [
    { field: 'nombre', headerName: 'Nombre', enabled: true },
    { field: 'codigo_zona', headerName: 'Codigo', enabled: true },
   
  ];
  