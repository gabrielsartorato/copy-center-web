import React from 'react';

import { FiLogIn, FiUser, FiLock } from 'react-icons/fi';
import Input from '../../components/Input';

import { Container, Content, Header, ContainerForm } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <Header>
          <h2>Seja Bem Vindo, faça seu login</h2>
        </Header>

        <ContainerForm>
          <form>
            <Input name="usuaio" icon={FiUser} placeholder="Usuário" />
            <Input name="password" icon={FiLock} placeholder="Senha" />

            <button type="submit">
              Entrar
              <FiLogIn />
            </button>
          </form>
        </ContainerForm>
      </Content>
    </Container>
  );
};

export default SignIn;
