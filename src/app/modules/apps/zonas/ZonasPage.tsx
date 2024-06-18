import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {ZonasListWrapper} from './zonas-list/ZonasList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Administracion de Zonas',
    path: '/apps/zonas/list',
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

const ZonasPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Listado de Zonas</PageTitle>
              <ZonasListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/zonas/list' />} />
    </Routes>
  )
}

export default ZonasPage
