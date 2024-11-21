import { ToolbarWrapper } from './components/toolbar/ToolbarWrapper';
import { Content } from '../../../../../_metronic/layout/components/content';
import CampanaGrid from './components/Grid/Grid';
import { useLayout } from '../../../../../_metronic/layout/core';

const CampanasListWrapper = () => {
 // const { config } = useLayout();
  // const customButtonConfig = config.app?.customButton; // Puedes eliminar esta línea

  return (
    <>
      <ToolbarWrapper/>       
      
      <Content>
        <CampanaGrid />
      </Content>
    </>
  );
};

export { CampanasListWrapper };