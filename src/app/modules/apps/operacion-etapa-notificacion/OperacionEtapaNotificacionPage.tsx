import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {OperacionEtapaNotificacionListWrapper} from './operacion-etapa-notificacion-list/OperacionEtapaNotificacionList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Administracion de Etapas',
    path: '/apps/maestros/etapas/notificaciones/list',
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

const OperacionEtapaNotificacionPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Listado de Notificaciones Etapa y por operación</PageTitle>
              <OperacionEtapaNotificacionListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/maestros/etapas/notificaciones/list' />} />
    </Routes>
  )
}

export default OperacionEtapaNotificacionPage
