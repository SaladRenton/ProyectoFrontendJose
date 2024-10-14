import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {EtapasListWrapper} from './etapas-list/EtapaList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Administracion de Etapas',
    path: '/apps/maestros/etapas/list',
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

const EtapasPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Listado de Etapas</PageTitle>
              <EtapasListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/maestros/etapas/list' />} />
    </Routes>
  )
}

export default EtapasPage
