import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {CampanasListWrapper} from './campanas-list/CampanaList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Administracion de Campañas',
    path: '/apps/operaciones/campanas/list',
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

const CampanasPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Listado de Campañas</PageTitle>
              <CampanasListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/operaciones/campanas/list' />} />
    </Routes>
  )
}

export default CampanasPage
