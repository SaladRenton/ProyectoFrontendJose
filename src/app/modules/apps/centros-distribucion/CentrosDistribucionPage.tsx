import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {CentrosDistribucionListWrapper} from './centros-distribucion-list/CentrosDistribucionList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Administracion de Centros',
    path: '/apps/maestros/centros/list',
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

const CentrosDistribucionPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Listado de Centros de distribución</PageTitle>
              <CentrosDistribucionListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/maestros/centros/list' />} />
    </Routes>
  )
}

export default CentrosDistribucionPage
