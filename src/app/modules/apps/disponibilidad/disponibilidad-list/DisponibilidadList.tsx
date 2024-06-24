import { ToolbarWrapper } from './components/toolbar/ToolbarWrapper'
import { Content } from '../../../../../_metronic/layout/components/content'
import DisponbilidadGrid from './components/Grid/Grid'
import TransportistaDisponibilidad from '../../viajes/viajes-list/components/table/modal/_disponibilidadTransportista';



const handleCloseDisponibilidadModal = () => {
    
};

const disponibilidadModalOpen = () => {
    
};



const DisponibilidadListWrapper = () => (




      <>
        <ToolbarWrapper />
        <Content>
        <TransportistaDisponibilidad
        open={disponibilidadModalOpen}
        onClose={handleCloseDisponibilidadModal}
      />
        </Content>
      </>


)

export {DisponibilidadListWrapper}
