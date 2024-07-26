import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import { UsuariosListWrapper } from './usuarios-list/UsuariosList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Administracion de Usuarios',
    path: '/apps/usuarios/list',
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

const UsuariosPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Listado de usuarios</PageTitle>
              <UsuariosListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/usuarios/list' />} />
    </Routes>
  )
}

export default UsuariosPage
