import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {PaquetesListWrapper} from './paquetes-list/PaquetesList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Administracion de paquetes',
    path: '/apps/paquetes/list',
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

const PaquetesPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Listado de paquetes</PageTitle>
              <PaquetesListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/paquetes/list' />} />
    </Routes>
  )
}

export default PaquetesPage
