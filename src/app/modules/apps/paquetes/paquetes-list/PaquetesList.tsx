import { ToolbarWrapper } from './components/toolbar/ToolbarWrapper'
import { Content } from '../../../../../_metronic/layout/components/content'
import PaqueteGrid from './components/Grid/Grid'

const PaquetesListWrapper = () => (


      <>
        <ToolbarWrapper />
        <Content>
        <PaqueteGrid></PaqueteGrid>
        </Content>
      </>


)

export {PaquetesListWrapper}
