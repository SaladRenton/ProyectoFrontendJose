import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {ViajesListWrapper} from './viajes-list/ViajeList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Seguimiento',
    path: '/apps/seguimiento/list',
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
          
              <PageTitle breadcrumbs={usersBreadcrumbs}>Seguimiento de Viajes</PageTitle>
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
