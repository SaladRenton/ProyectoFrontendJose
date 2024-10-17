import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {CalificacionesListWrapper} from './calificaciones-list/CalificacionList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Administracion de Calificaciones',
    path: '/apps/maestros/calificaciones/list',
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

const CalificacionesPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Listado de Calificaciones</PageTitle>
              <CalificacionesListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/maestros/calificaciones/list' />} />
    </Routes>
  )
}

export default CalificacionesPage
