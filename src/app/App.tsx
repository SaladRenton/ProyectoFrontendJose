import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { I18nProvider } from '../_metronic/i18n/i18nProvider'
import { LayoutProvider, LayoutSplashScreen } from '../_metronic/layout/core'
import { MasterInit } from '../_metronic/layout/MasterInit'
import { AuthInit } from './modules/auth'
import { ThemeModeProvider } from '../_metronic/partials'
import { PermissionsProvider } from './context/PermissionsContext'

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <ThemeModeProvider>
            <AuthInit>
              <PermissionsProvider> {/* Envolver dentro del PermissionsProvider */}
                <Outlet />
                <MasterInit />
              </PermissionsProvider>
            </AuthInit>
          </ThemeModeProvider>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export { App }

