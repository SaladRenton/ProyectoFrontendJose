import { ToolbarWrapper } from './components/toolbar/ToolbarWrapper'
import { Content } from '../../../../../_metronic/layout/components/content'
import EtapasGrid from './components/Grid/Grid'

const EtapasListWrapper = () => (


      <>
        <ToolbarWrapper />
        <Content>
        <EtapasGrid></EtapasGrid>
        </Content>
      </>


)

export {EtapasListWrapper}
