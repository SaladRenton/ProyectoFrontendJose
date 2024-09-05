import { ToolbarWrapper } from './components/toolbar/ToolbarWrapper'
import { Content } from '../../../../../_metronic/layout/components/content'
import CampanaGrid from './components/Grid/Grid'

const CampanasListWrapper = () => (


      <>
        <ToolbarWrapper />
        <Content>
        <CampanaGrid></CampanaGrid>
        </Content>
      </>


)

export {CampanasListWrapper}
