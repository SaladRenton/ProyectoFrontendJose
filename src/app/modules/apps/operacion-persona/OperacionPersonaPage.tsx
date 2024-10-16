import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {OperacionPersonaListWrapper} from './operacion-persona-list/OperacionPersonaList'

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

const OperacionPersonaPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Listado de Transportistas por operación</PageTitle>
              <OperacionPersonaListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/maestros/centros/list' />} />
    </Routes>
  )
}

export default OperacionPersonaPage
