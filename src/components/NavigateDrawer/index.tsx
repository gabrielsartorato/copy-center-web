import React from 'react';
import { useLocation } from 'react-router-dom';

import {
  FiMenu,
  FiUser,
  FiCreditCard,
  FiList,
  FiFileText,
  FiPower,
} from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

import {
  MenuDrawer,
  Header,
  Divider,
  NavigateMenu,
  Logout,
  NavigateLink,
} from './styles';

const NavigateDrawer: React.FC = () => {
  const { signOut } = useAuth();

  const { pathname } = useLocation();

  return (
    <MenuDrawer>
      <Header>
        <h2>Willian</h2>
        <strong>12 / 11 / 2020</strong>
      </Header>
      <Divider />
      <NavigateMenu>
        <NavigateLink name="/dashboard" path={pathname} to="/">
          <FiMenu />
          Pagina Inicial
        </NavigateLink>
        <NavigateLink name="/clients" path={pathname} to="/clients">
          <FiUser />
          Clientes
        </NavigateLink>
        <NavigateLink name="/seller" path={pathname} to="/seller">
          <FiCreditCard />
          Vendas
        </NavigateLink>
        <NavigateLink name="/sales-report" path={pathname} to="/sales-report">
          <FiList />
          Relatório de vendas
        </NavigateLink>
        <NavigateLink name="/products" path={pathname} to="/products">
          <FiFileText />
          Serviços
        </NavigateLink>
      </NavigateMenu>
      <Divider />
      <Logout>
        <button type="button" onClick={signOut}>
          <FiPower />
          Sair
        </button>
      </Logout>
    </MenuDrawer>
  );
};

export default NavigateDrawer;
