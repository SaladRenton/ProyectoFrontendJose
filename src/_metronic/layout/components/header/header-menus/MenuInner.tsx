import {useIntl} from 'react-intl'
import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {MegaMenu} from './MegaMenu'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard' />
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



      <MenuItem title='Transportistas' to='/apps/transportistas/list' />

      
      <MenuItem title='Operaciones' to='/apps/operaciones/list' />


      <MenuItem title='Disponibilidad' to='/apps/disponibilidad/list' />

      <MenuItem title='Viajes' to='/apps/viajes/list' />
      
      <MenuItem title='Paquetes' to='/apps/paquetes/list' />


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
