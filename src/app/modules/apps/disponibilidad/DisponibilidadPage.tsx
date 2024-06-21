import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {DisponibilidadListWrapper} from './disponibilidad-list/DisponibilidadList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Administracion de disponbilidad',
    path: '/apps/disponbilidad/list',
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

const DisponbilidadPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Listado de Disponbilidad</PageTitle>
              <DisponibilidadListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/disponbilidad/list' />} />
    </Routes>
  )
}

export default DisponbilidadPage
