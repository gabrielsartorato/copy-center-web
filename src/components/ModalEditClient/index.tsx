import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import api from '../../services/api';

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

  const handleSubmit = useCallback(
    async (data: IEditClient) => {
      const client = {
        client_name: data.client_name,
        cpf_cnpj: data.formatCpf.replace(/[^\d]+/g, ''),
        phone_number: data.formatPhone.replace(/[^\d]+/g, ''),
        email: data.email,
      };

      const response = await api.put(`/clients/${editingClient.id}`, client);

      handleUpdateClient(response.data);
      setIsOpen();
    },
    [handleUpdateClient, setIsOpen, editingClient.id],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingClient}>
        <h1>Editar Cliente</h1>

        <Input name="client_name" placeholder="Nome do client" />

        <Input name="email" placeholder="Ex: email@email.com" />

        <Input mask="cpf" name="formatCpf" placeholder="Digite o cpf ou cnpj" />

        <Input
          mask="phone"
          name="formatPhone"
          placeholder="Digite o telefone"
        />

        <button type="submit">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditClient;
