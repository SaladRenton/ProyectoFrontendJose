export interface FilterConfig {
    field: string;
    headerName: string;
    enabled: boolean;
  }
  
  export const filterConfig: FilterConfig[] = [
    { field: 'id', headerName: 'ID', enabled: true },
    { field: 'lote_equipos_id', headerName: 'Lote Interno', enabled: true },
    { field: 'codigo_barra', headerName: 'Codigo Barra', enabled: true },
    { field: 'numero_serie', headerName: 'Nro. Serie', enabled: true },
    { field: 'mac', headerName: 'Mac', enabled: true },
    { field: 'lote_externo', headerName: 'Lote externo', enabled: true },
  ];
  