import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Form } from './styles';

import Modal from '../../../../components/Modal';
import Input from '../../../../components/Input';

import api from '../../../../services/api';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErros';

interface IClient {
  id: string;
  client_name: string;
  cpf_cnpj: string;
  email: string;
  status: number;
  user_id: string;
  phone_number?: string | null;
  formatPhone?: string | null;
  formatStatus?: string | null;
  formatCreatedAt?: string | null;
  formatCpf?: string | null;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateClient: (client: IEditClient) => void;
  editingClient: IClient;
}

interface IEditClient {
  client_name: string;
  email: string;
  formatCpf: string;
  formatPhone: string;
}

const ModalEditClient: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingClient,
  handleUpdateClient,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: IEditClient) => {
      try {
        const schema = Yup.object().shape({
          client_name: Yup.string().required('Campo Obrigatório!'),
          email: Yup.string().email('Email invalido!'),
          formatCpf: Yup.string().required('Campo obritagório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const client = {
          client_name: data.client_name,
          cpf_cnpj: data.formatCpf.replace(/[^\d]+/g, ''),
          phone_number: data.formatPhone.replace(/[^\d]+/g, ''),
          email: data.email,
        };

        const response = await api.put(`/clients/${editingClient.id}`, client);

        handleUpdateClient(response.data);
        setIsOpen();

        addToast({
          title: 'Alteração',
          description: 'Cliente alterado com sucesso',
          type: 'success',
        });
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
    [handleUpdateClient, setIsOpen, editingClient.id, addToast],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingClient}>
        <h1>Editar Cliente</h1>

        <Input name="client_name" placeholder="Nome do cliente" />

        <Input name="email" placeholder="Ex: email@email.com" />

        <Input mask="cpf" name="formatCpf" placeholder="Digite o cpf ou cnpj" />

        <Input
          mask="phone"
          name="formatPhone"
          placeholder="Digite o telefone"
        />

        <button type="submit">
          <div className="text">Editar Cliente</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditClient;
