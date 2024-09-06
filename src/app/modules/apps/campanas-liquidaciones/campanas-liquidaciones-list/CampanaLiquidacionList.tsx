import { ToolbarWrapper } from './components/toolbar/ToolbarWrapper'
import { Content } from '../../../../../_metronic/layout/components/content'
import CampanaLiquidacionGrid from './components/Grid/Grid'

const CampanasLiquidacionesListWrapper = () => (


      <>
        <ToolbarWrapper />
        <Content>
        <CampanaLiquidacionGrid></CampanaLiquidacionGrid>
        </Content>
      </>


)

export {CampanasLiquidacionesListWrapper}
