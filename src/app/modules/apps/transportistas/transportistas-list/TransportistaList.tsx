import { ToolbarWrapper } from './components/toolbar/ToolbarWrapper'
import { Content } from '../../../../../_metronic/layout/components/content'
import TransportistaGrid from './components/Grid/Grid'

const TransportistasListWrapper = () => (


      <>
        <ToolbarWrapper />
        <Content>
        <TransportistaGrid></TransportistaGrid>
        </Content>
      </>


)

export {TransportistasListWrapper}
