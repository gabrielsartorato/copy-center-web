import React from 'react';
import { FiCreditCard, FiUsers } from 'react-icons/fi';
import NavigateDrawer from '../../components/NavigateDrawer';

import {
  Container,
  Content,
  CardContent,
  ContentInformation,
  ContentTable,
} from './styles';

const DashBoard: React.FC = () => {
  return (
    <Container>
      <NavigateDrawer />
      <Content>
        <ContentInformation>
          <CardContent>
            <FiUsers />
            <h3>Clientes</h3>
            <p>25</p>
          </CardContent>
          <CardContent>
            <FiCreditCard />
            <h3>Vendas do Dia</h3>
            <p>128</p>
          </CardContent>
        </ContentInformation>
        <ContentTable />
      </Content>
    </Container>
  );
};

export default DashBoard;
