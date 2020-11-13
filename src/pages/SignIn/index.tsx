import React, { useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { Form } from '@unform/web';

import { FiLogIn, FiUser, FiLock } from 'react-icons/fi';
import Input from '../../components/Input';

import { Container, Content, Header, ContainerForm } from './styles';

interface SignInFormData {
  user: string;
  passwrod: string;
}

const SignIn: React.FC = () => {
  const history = useHistory();
  const formRef = useRef(null);
  const handleSubmit = useCallback(
    (data: SignInFormData) => {
      history.push('/Dashboard');
    },
    [history],
  );

  return (
    <Container>
      <Content>
        <Header>
          <h2>Seja Bem Vindo, faça seu login</h2>
        </Header>

        <ContainerForm>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="usuario"
              type="text"
              icon={FiUser}
              placeholder="Usuário"
            />
            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Senha"
            />

            <button type="submit">
              Entrar
              <FiLogIn />
            </button>
          </Form>
        </ContainerForm>
      </Content>
    </Container>
  );
};

export default SignIn;
