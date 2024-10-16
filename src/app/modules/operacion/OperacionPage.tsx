import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { PageTitle } from '../../../_metronic/layout/core'
import { OperacionHeader } from './OperacionHeader'
import { getOperacion } from '../apps/operaciones/operaciones-list/core/_requests'
import { Content } from '../../../_metronic/layout/components/content'
import { Card } from '@mui/material'


const OperacionPageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>() // Obtienes el id de la operación
  const [operacion, setOperacion] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOperacion = async () => {
      try {
        const response = await getOperacion(Number(id))
        setOperacion(response.data)
      } catch (err) {
        setError('Error fetching Operacion details')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchOperacion()
    }
  }, [id])

  return (
    <>
      <PageTitle>Detalle de la Operación</PageTitle>



      {/* Contenido dinámico que cambia según el tab */}
      <Content>

        {/* Header con información de la operación */}
        {operacion && (
          <OperacionHeader operacion={operacion} loading={loading} error={error} idoperacion={id} />
        )}

        

          <Outlet />

   
      </Content>
    </>
  )
}

export default OperacionPageDetail
