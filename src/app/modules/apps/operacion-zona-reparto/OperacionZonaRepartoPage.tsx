import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {OperacionZonaRepartoListWrapper} from './operacion-zona-reparto-list/OperacionZonaRepartoList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Administracion de Zonas',
    path: '/apps/maestros/zonas-reparto/list',
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

const OperacionZonaRepartoPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Listado de Zonas por operación</PageTitle>
              <OperacionZonaRepartoListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/maestros/zonas-reparto/list' />} />
    </Routes>
  )
}

export default OperacionZonaRepartoPage
