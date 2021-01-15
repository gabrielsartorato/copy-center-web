import React, { useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import NavigateDrawer from '../../components/NavigateDrawer';
import api from '../../services/api';

import { Container, Content, CardContent, ContentInformation } from './styles';

const DashBoard: React.FC = () => {
  const [activeClient, setActiveClient] = useState<number>(0);

  api.get('clients/count').then((response) => {
    setActiveClient(response.data);
  });

  return (
    <Container>
      <NavigateDrawer />
      <Content>
        <ContentInformation>
          <CardContent>
            <FiUsers />
            <h3>Clientes Ativos</h3>
            <p>{activeClient}</p>
          </CardContent>
        </ContentInformation>
      </Content>
    </Container>
  );
};

export default DashBoard;
