import React from 'react';

import {
  FiMenu,
  FiUser,
  FiCreditCard,
  FiList,
  FiFileText,
  FiPower,
} from 'react-icons/fi';

import { MenuDrawer, Header, Divider, NavigateMenu, Logout } from './styles';

const NavigateDrawer: React.FC = () => {
  return (
    <MenuDrawer>
      <Header>
        <h2>Willian</h2>
        <strong>12 / 11 / 2020</strong>
      </Header>
      <Divider />
      <NavigateMenu>
        <a href="/">
          <FiMenu />
          Pagina Inicial
        </a>
        <a href="/">
          <FiUser />
          Clientes
        </a>
        <a href="/">
          <FiCreditCard />
          Vendas
        </a>
        <a href="/">
          <FiList />
          Relatório de vendas
        </a>
        <a href="/">
          <FiFileText />
          Serviços
        </a>
      </NavigateMenu>
      <Divider />
      <Logout>
        <a href="/">
          <FiPower />
          Sair
        </a>
      </Logout>
    </MenuDrawer>
  );
};

export default NavigateDrawer;
