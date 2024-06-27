import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {OperacionListWrapper} from './operaciones-list/OperacionList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Administracion de Operaciones',
    path: '/apps/Operaciones/list',
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

const OperacionesPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Listado de Operaciones</PageTitle>
              <OperacionListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/operaciones/list' />} />
    </Routes>
  )
}

export default OperacionesPage
