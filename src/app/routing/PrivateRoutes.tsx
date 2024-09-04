import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import { useAuth } from '../modules/auth'



const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  const TransportistasPage = lazy(() => import('../modules/apps/transportistas/TransportistasPage'))
  const OperacionesPage = lazy(() => import('../modules/apps/operaciones/OperacionesPage'))
  const DisponibilidadPage = lazy(() => import('../modules/apps/disponibilidad/DisponibilidadPage'))
  const ZonasPage = lazy(() => import('../modules/apps/zonas/ZonasPage'))
  const ViajesPage = lazy(() => import('../modules/apps/viajes/ViajesPage'))
  const SeguimientoPage = lazy(() => import('../modules/apps/seguimiento/ViajesPage'))
  const PaquetesPage = lazy(() => import('../modules/apps/paquetes/PaquetesPage'))
  const UsuariosPage = lazy(() => import('../modules/apps/usuarios/UsuariosPage'))
  const OperacionPageDetail = lazy(() => import('../modules/operacion/OperacionPage'))
  const { currentUser, logout } = useAuth()
  return (


    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion  PAGINA INICIAL*/}
        <Route path='auth/*' element={<Navigate to={(currentUser && currentUser.roles && currentUser.roles[0].pagina_inicial) ? currentUser.roles[0].pagina_inicial : "/apps/viajes/list"} />} />
        {/* Pages */}

        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />

        <Route
          path='apps/transportistas/*'
          element={
            <SuspensedView>
              <TransportistasPage />
            </SuspensedView>
          }
        />

        <Route
          path='apps/operaciones/*'
          element={
            <SuspensedView>
              <OperacionesPage />
            </SuspensedView>
          }
        />

        <Route
          path='apps/disponibilidad/*'
          element={
            <SuspensedView>
              <DisponibilidadPage />
            </SuspensedView>
          }
        />




        <Route
          path='apps/viajes/*'
          element={
            <SuspensedView>
              <ViajesPage />

            </SuspensedView>
          }
        />

        <Route
          path='apps/seguimiento/*'
          element={
            <SuspensedView>
              <SeguimientoPage />

            </SuspensedView>
          }
        />

        <Route
          path='apps/paquetes/*'
          element={
            <SuspensedView>
              <PaquetesPage />
            </SuspensedView>
          }
        />

        <Route
          path='apps/usuarios/*'
          element={
            <SuspensedView>
              <UsuariosPage />
            </SuspensedView>
          }
        />


        <Route
          path='pages/operacion/:id'
          element={
            <SuspensedView>
              <OperacionPageDetail />
            </SuspensedView>
          }
        />


        <Route
          path='apps/zonas/*'
          element={
            <SuspensedView>
              <ZonasPage />
            </SuspensedView>
          }
        />



        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
