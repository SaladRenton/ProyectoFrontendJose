import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {IrregularidadesListWrapper} from './irregularidades-list/IrregularidadList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Administracion de Irregularidades',
    path: '/apps/maestros/irregularidades/list',
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

const IrregularidadesPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='list'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Listado de Irregularidades</PageTitle>
              <IrregularidadesListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/apps/maestros/irregularidades/list' />} />
    </Routes>
  )
}

export default IrregularidadesPage
