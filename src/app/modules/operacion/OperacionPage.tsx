import React, { useState, useEffect } from 'react';
import { Navigate, Routes, Route, Outlet, useParams, useMatch } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { Overview } from './components/Overview'
import { OperacionHeader } from './OperacionHeader'
import { getOperacion } from '../apps/operaciones/operaciones-list/core/_requests';
import OperacionPersona from './components/OperacionesPersonaGrid';


const API_URL = import.meta.env.VITE_APP_API_URL;

import { Content } from '../../../_metronic/layout/components/content';



const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Operacion',
    path: 'pages/operacion/overview/',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]


const OperacionPage = () => {

  const { id } = useParams();
  const numericId = Number(id);  // Convertir id a número
  const [operacion, setOperacion] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchOperacion = async () => {
      try {
        const response = await getOperacion(numericId);
        setOperacion(response.data);
      } catch (err) {
        setError('Error fetching Operacion details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOperacion();
    }
  }, [id]);


  return (
    <Content>


      <PageTitle breadcrumbs={profileBreadCrumbs}>Overview</PageTitle>
      {operacion && <OperacionHeader operacion={operacion} loading={loading} error={error} />}


      <div className='row g-5 g-xxl-8'>
        <div className='col-xl-3'>
          Transportistas
          {operacion && <OperacionPersona operacionId={operacion.id} />}
        </div>

        <div className='col-xl-6'>

        </div>
      </div>




    </Content>

  )
}

export default OperacionPage
