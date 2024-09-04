import { ToolbarWrapper } from './components/toolbar/ToolbarWrapper'
import { Content } from '../../../../../_metronic/layout/components/content'
import ViajeGrid from './components/Grid/Grid'

const ViajesListWrapper = () => (


      <>
        <ToolbarWrapper />
        <Content>
        <ViajeGrid></ViajeGrid>
        </Content>
      </>


)

export {ViajesListWrapper}
