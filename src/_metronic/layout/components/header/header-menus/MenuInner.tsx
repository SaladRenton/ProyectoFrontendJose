import { useIntl } from 'react-intl'
import { MenuItem } from './MenuItem'
import { MenuInnerWithSub } from './MenuInnerWithSub'
import { MegaMenu } from './MegaMenu'
import { usePermissions } from '../../../../../app/context/PermissionsContext'
import { useAuth } from '../../../../../app/modules/auth'

export function MenuInner() {
  const { permissions } = usePermissions();
  const {auth} = useAuth()

  const intl = useIntl();

  
  const hasPermission = ( permissionName: string): boolean => {

    if(auth)
      return auth.permissions.some(permission => permission.name === permissionName);
    else
      return false
  };





  return (

    <>


      {hasPermission('usuarios.index') &&
        <MenuItem title='Usuarios' to='/apps/usuarios/list' />
      }


      <MenuItem title={intl.formatMessage({ id: 'MENU.DASHBOARD' })} to='/dashboard' />
      {/* <MenuItem title='Layout Builder' to='/builder' /> */}


      {/* <MenuInnerWithSub title='Apps' to='/apps' menuPlacement='bottom-start' menuTrigger='click'>
     
        <MenuInnerWithSub
          title='Chat'
          to='/apps/chat'
          icon='message-text-2'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
          <MenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
          <MenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
        </MenuInnerWithSub>
        <MenuItem icon='abstract-28' to='/apps/user-management/users' title='User management' />
      </MenuInnerWithSub> */}

      {hasPermission('zonas-reparto.update') &&

        <MenuInnerWithSub title='Geo' to='/apps' menuPlacement='bottom-start' menuTrigger='click'>



          <MenuInnerWithSub
            title='Zonas'
            to='/apps/zonas'
            icon='message-text-2'
            hasArrow={true}
            menuPlacement='right-start'
            menuTrigger={`{default:'click', lg: 'hover'}`}
          >
            <MenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
            <MenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
            <MenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
          </MenuInnerWithSub>
          <MenuItem icon='abstract-28' to='/apps/zonas/list' title='Administracion de Zonas' />
          <MenuItem icon='abstract-25' to='/apps/zonas-transportistas/list' title='Asociar zonas a transportistas' />
        </MenuInnerWithSub>
      }

      {hasPermission('transportistas.store') &&
        <MenuItem title='Transportistas' to='/apps/transportistas/list' />
      }


      {hasPermission('operaciones.store') &&
        <MenuItem title='Operaciones' to='/apps/operaciones/list' />
      }


      {hasPermission('disponibilidad-transportistas.obtenerDisponibilidadDiaria') &&
        <MenuItem title='Disponibilidad' to='/apps/disponibilidad/list' />
      }



      {hasPermission('viajes.store') &&
        <MenuItem title='Viajes' to='/apps/viajes/list' />
      }

      {hasPermission('paquetes.store') &&
        <MenuItem title='Paquetes' to='/apps/paquetes/list' />

      }


      {/* <MenuInnerWithSub
        isMega={true}
        title='Layouts'
        to='/mega-menu'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MegaMenu />
      </MenuInnerWithSub> */}
    </>
  )
}
