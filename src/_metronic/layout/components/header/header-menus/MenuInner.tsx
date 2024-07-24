import { useIntl } from 'react-intl'
import { MenuItem } from './MenuItem'
import { MenuInnerWithSub } from './MenuInnerWithSub'
import { MegaMenu } from './MegaMenu'
import { usePermissions } from '../../../../../app/context/PermissionsContext'

export function MenuInner() {
  const { permissions } = usePermissions();

  const intl = useIntl();
  return (
    <>
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

      {permissions.includes('zonas-reparto.update') &&

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
        </MenuInnerWithSub>
      }

      {permissions.includes('transportistas.store') &&
        <MenuItem title='Transportistas' to='/apps/transportistas/list' />
      }


      {permissions.includes('operaciones.store') &&
        <MenuItem title='Operaciones' to='/apps/operaciones/list' />
      }


      {permissions.includes('disponibilidad-transportistas.obtenerDisponibilidadDiaria') &&
        <MenuItem title='Disponibilidad' to='/apps/disponibilidad/list' />
      }



      {permissions.includes('viajes.store') &&
        <MenuItem title='Viajes' to='/apps/viajes/list' />
      }

      {permissions.includes('paquetes.store') &&
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
