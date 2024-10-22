import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {OperacionCalificacionListWrapper} from './operacion-calificacion-list/OperacionCalificacionList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Administracion de Calificaciones',
    path: '/apps/maestros/calificacion-operacion/list',
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

const OperacionCalificacionPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Listado de Calificaciones</PageTitle>
              <OperacionCalificacionListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/maestros/calificacion-operacion/list' />} />
    </Routes>
  )
}

export default OperacionCalificacionPage
