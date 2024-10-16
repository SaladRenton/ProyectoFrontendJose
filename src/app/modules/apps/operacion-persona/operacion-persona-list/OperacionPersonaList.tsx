import { ToolbarWrapper } from './components/toolbar/ToolbarWrapper'
import { Content } from '../../../../../_metronic/layout/components/content'
import OperacionPersonaGrid from './components/Grid/Grid'

const OperacionPersonaListWrapper = () => (


      <>
        <ToolbarWrapper />
        <Content>
        <OperacionPersonaGrid></OperacionPersonaGrid>
        </Content>
      </>


)

export {OperacionPersonaListWrapper}
