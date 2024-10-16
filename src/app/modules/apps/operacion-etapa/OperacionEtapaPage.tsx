import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {OperacionEtapaListWrapper} from './operacion-etapa-list/OperacionEtapaList'

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

const OperacionEtapaPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Listado de Etapas por operación</PageTitle>
              <OperacionEtapaListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/maestros/etapas/list' />} />
    </Routes>
  )
}

export default OperacionEtapaPage
