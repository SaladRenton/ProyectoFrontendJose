import { useIntl } from 'react-intl'
import { KTIcon } from '../../../../helpers'
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub'
import { SidebarMenuItem } from './SidebarMenuItem'
import { useAuth } from '../../../../../app/modules/auth';

const API_URL = import.meta.env.VITE_APP_API_URL.replace('/api', ''); // Reemplaza "/api" si está presente

const SidebarMenuMain = () => {
  const intl = useIntl()
  const { auth } = useAuth()




  const hasPermission = (permissionName: string): boolean => {

    if (auth)
      return auth.permissions.some(permission => permission.name === permissionName);
    else
      return false
  };


  return (
    <>
      {/* Dashboard */}
      {/* <SidebarMenuItem
        to='/apps/dashboard'
        icon='speedometer2' // Bootstrap icon
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
      /> */}



      {/* Operaciones */}
      <SidebarMenuItemWithSub
        to='/apps/operaciones'
        title='Operaciones'
        icon='shop' // Bootstrap icon
      >
        {hasPermission('viajes.store') &&
          <SidebarMenuItem to='/apps/viajes/list' title='Gestion de Viajes' hasBullet={true} />
        }
        {hasPermission('viajes.index') &&
          <SidebarMenuItem to='/apps/seguimiento/list' title='Seguimiento' hasBullet={true} />
        }


      </SidebarMenuItemWithSub>



      {/* Operaciones */}
      <SidebarMenuItemWithSub
        to='/apps/crm'
        title='CRM'
        icon='people' // Bootstrap icon
      >


        {hasPermission('campana.index') &&
          <SidebarMenuItemWithSub to='/apps/operaciones/campanas' title='Campañas' hasBullet={true}>
            <SidebarMenuItem to='/apps/operaciones/campanas/list' title='Gestión de Campañas' hasBullet={true} />
            {hasPermission('estado-contacto.index') &&
              <SidebarMenuItem to='/apps/operaciones/campanas/liquidaciones/list' title='Liquidación' hasBullet={true} />
            }
          </SidebarMenuItemWithSub>
        }

        {hasPermission('formularios.index') &&
          <SidebarMenuItemWithSub to='/apps/operaciones/formularios' title='Formularios' hasBullet={true}>
            <SidebarMenuItem to='/apps/operaciones/formularios/list' title='Gestión de Formularios' hasBullet={true} />

          </SidebarMenuItemWithSub>
        }
      </SidebarMenuItemWithSub>

      {/* Transportistas */}
      {hasPermission('transportistas.store') &&
        <SidebarMenuItemWithSub
          to='/apps/transportistas'
          title='Transportistas'
          icon='truck' // Bootstrap icon
        >
          <SidebarMenuItem to='/apps/transportistas/list' title='Gestión de Transportistas' hasBullet={true} />
          <SidebarMenuItem to='/apps/transportistas/asociar-zonas' title='Asociar Transportistas a Zonas' hasBullet={true} />
          <SidebarMenuItem to='/apps/transportistas/gestion' title='Gestión de Transportes' hasBullet={true} />
          {hasPermission('disponibilidad-transportistas.obtenerDisponibilidadDiaria') &&
            <SidebarMenuItem to='/apps/disponibilidad/list' title='Ver Agenda' hasBullet={true} />
          }
        </SidebarMenuItemWithSub>
      }
      {/* Zonas */}

      {hasPermission('zonas-reparto.update') &&
        <SidebarMenuItemWithSub
          to='/apps/zonas'
          title='Zonas'
          icon='map' // Bootstrap icon for map
        >
          <SidebarMenuItem to='/apps/zonas/list' title='Gestión de Zonas' hasBullet={true} />
          <SidebarMenuItem to='/apps/zonas/asociar-operaciones' title='Asociar Operaciones y Zonas' hasBullet={true} />
        </SidebarMenuItemWithSub>
      }



      {/* Paquetes */}
      {hasPermission('paquetes.store') &&
        <SidebarMenuItem
          to='/apps/paquetes/list'
          title='Paquetes'
          icon='gift' // Bootstrap icon for Paquetes
        />
      }
      {hasPermission('usuarios.index') &&

        <SidebarMenuItemWithSub
          to='/apps/usuarios'
          title='Usuarios'
          icon='people' // Bootstrap icon
        >
          <SidebarMenuItem to='/apps/usuarios/list' title='Gestión de Usuarios' hasBullet={true} />
          <SidebarMenuItem to='/apps/usuarios/roles' title='Gestión de Roles' hasBullet={true} />
        </SidebarMenuItemWithSub>
      }

      {hasPermission('usuarios.index') &&

        <SidebarMenuItemWithSub
          to='/apps/maestros'
          title='Maestros'
          icon='people' // Bootstrap icon
        >
          {hasPermission('centros-distribucion.index') &&
            <SidebarMenuItem to='/apps/maestros/centros/list' title='Centros de Distribución' hasBullet={true} />
          }
          {hasPermission('etapas.index') &&
            <SidebarMenuItem to='/apps/maestros/etapas/list' title='Etapas' hasBullet={true} />
          }
          <SidebarMenuItem to='/apps/operaciones/list' title='Operaciones' hasBullet={true} />

          {hasPermission('irregularidades.index') &&
            <SidebarMenuItem to='/apps/maestros/irregularidades/list' title='Irregularidades' hasBullet={true} />
          }

          {hasPermission('contact-attempts-types.index') &&
            <SidebarMenuItem to='/apps/maestros/calificaciones/list' title='Calificaciones' hasBullet={true} />
          }

        </SidebarMenuItemWithSub>
      }





      {/* Monitorización */}
      <SidebarMenuItemWithSub
        to='#' // We don't use 'to' since these are external links
        title='Monitorización'
        icon='eye' // Bootstrap icon
      >
        <div className='menu-item'>
          <a
            href={`${API_URL}/horizon`} // Removed /api/ and added horizon
            target='_blank'
            rel='noopener noreferrer'
            className='menu-link'
          >
            <span className='menu-bullet'>
              <span className='bullet bullet-dot'></span>
            </span>
            <span className='menu-title'>Procesos Background</span>
          </a>
        </div>
        <div className='menu-item'>
          <a
            href={`${API_URL}/telescope`} // Removed /api/ and added telescope
            target='_blank'
            rel='noopener noreferrer'
            className='menu-link'
          >
            <span className='menu-bullet'>
              <span className='bullet bullet-dot'></span>
            </span>
            <span className='menu-title'>Telescope</span>
          </a>
        </div>
      </SidebarMenuItemWithSub>
    </>
  )
}

export { SidebarMenuMain }