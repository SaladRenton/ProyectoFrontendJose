import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {ViajesListWrapper} from './viajes-list/ViajeList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Administracion de Viajes',
    path: '/apps/viajes/list',
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

const ViajesPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Listado de Viajes</PageTitle>
              <ViajesListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/Viajes/list' />} />
    </Routes>
  )
}

export default ViajesPage
