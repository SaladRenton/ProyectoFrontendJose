import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {CampanasLiquidacionesListWrapper} from './campanas-liquidaciones-list/CampanaLiquidacionList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Calificaciones',
    path: '/apps/operaciones/campanas/liquidaciones/list',
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

const CampanasLiquidacionesPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Listado de Calificaciones</PageTitle>
              <CampanasLiquidacionesListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/operaciones/campanas/liquidaciones/list' />} />
    </Routes>
  )
}

export default CampanasLiquidacionesPage
