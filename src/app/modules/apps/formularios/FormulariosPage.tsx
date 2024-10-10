import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {FormulariosListWrapper} from './formularios-list/FormularioList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Administracion de Formularios',
    path: '/apps/operaciones/formularios/list',
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

const FormularioPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Listado de Formularios</PageTitle>
              <FormulariosListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/operaciones/formularios/list' />} />
    </Routes>
  )
}

export default FormularioPage
