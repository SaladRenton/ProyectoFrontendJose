import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {TransportistasListWrapper} from './transportistas-list/TransportistaList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Administracion de transportistas',
    path: '/apps/transportistas/list',
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

const TransportistasPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Listado de transportistas</PageTitle>
              <TransportistasListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/transportistas/list' />} />
    </Routes>
  )
}

export default TransportistasPage
