import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {OperacionEstadoOrigenDestinoListWrapper} from './operacion-estado-origen-destino-list/OperacionEstadoOrigenDestinoList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Administracion de Centros',
    path: '/apps/maestros/estados-origen-destino/list',
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

const OperacionEstadoOrigenDestinoPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Listado de Estados Origen-Destino por operación</PageTitle>
              <OperacionEstadoOrigenDestinoListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/maestros/estados-origen-destino/list' />} />
    </Routes>
  )
}

export default OperacionEstadoOrigenDestinoPage
