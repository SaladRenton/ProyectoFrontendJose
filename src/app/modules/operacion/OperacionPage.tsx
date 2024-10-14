import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useParams } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { OperacionHeader } from './OperacionHeader'
import { getOperacion } from '../apps/operaciones/operaciones-list/core/_requests'

const OperacionPageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>() // Obtienes el id de la operación
  const [operacion, setOperacion] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const location = useLocation() // Para saber la ruta actual

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

      {/* Header con información de la operación */}
      {operacion && (
        <OperacionHeader operacion={operacion} loading={loading} error={error} idoperacion ={id} />
      )}

      

      {/* Contenido dinámico que cambia según el tab */}
      <Outlet />
    </>
  )
}

export default OperacionPageDetail
