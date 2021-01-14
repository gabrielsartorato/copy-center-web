import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Form } from './styles';

import { useToast } from '../../../../hooks/toast';

import Modal from '../../../../components/Modal';
import Input from '../../../../components/Input';

import api from '../../../../services/api';
import getValidationErrors from '../../../../utils/getValidationErros';

interface IClient {
  id: string;
  client_name: string;
  cpf_cnpj: string;
  email: string;
  status: number;
  user_id: string;
  phone_number: string;
  created_at: string;
}

interface ICreateClientData {
  name: string;
  cpf_cnpj: string;
  email: string;
  phone: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddClient: (client: IClient) => void;
}

const ModalAddClient: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddClient,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const handleSubmit = useCallback(
    async (data: ICreateClientData) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Campo obrigatório'),
          email: Yup.string().email('Email Inválido'),
          cpf_cnpj: Yup.string(),
          phone_number: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post('clients', {
          client_name: data.name,
          cpf_cnpj: data.cpf_cnpj.replace(/[^\d]+/g, '') || '',
          phone_number: data.phone.replace(/[^\d]+/g, '' || ''),
          email: data.email,
        });

        addToast({
          title: 'Cadastro',
          description: 'Cadastro realizado com sucesso!',
          type: 'success',
        });

        setIsOpen();

        handleAddClient(response.data);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          console.log(errors);
          return;
        }

        console.log(error.response.data);

        setIsOpen();

        addToast({
          type: 'error',
          title: 'Erro ao fazer o cadastro',
          description:
            'Ocorreu um erro ao tentar fazer o cadastro, cliente já existente.',
        });
      }
    },
    [setIsOpen, handleAddClient, addToast],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Cliente</h1>
        <Input name="name" placeholder="Digite o nome aqui" />

        <Input
          minLength={11}
          maxLength={18}
          mask="cpf"
          name="cpf_cnpj"
          placeholder="Digite o Cpf ou Cnpj Aqui"
        />
        <Input name="email" placeholder="Ex: email@email.com" />

        <Input
          mask="phone"
          maxLength={15}
          name="phone"
          placeholder="(11) 4444-4444 ou (11) 97777-7777"
        />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Cliente</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddClient;
