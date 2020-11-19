import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import SelectSearch from 'react-select-search';

import api from '../../services/api';
import { phoneMask } from '../../masks/phoneMask';
import { cpfMask } from '../../masks/cpfMask';
import { useAuth } from '../../hooks/auth';

import NavigateDrawer from '../../components/NavigateDrawer';
import ModalAddClient from '../../components/ModalAddClient';

import {
  Container,
  Content,
  HeaderButtonAddClient,
  SearchClient,
  ContainerTable,
} from './styles';

import './stylescss.css';

interface IClientResponse {
  id: string;
  client_name: string;
  cpf_cnpj: string;
  email: string;
  status: number;
  user_id: string;
  phone_number: string;
  created_at: string;
}

const Clients: React.FC = () => {
  const { signOut } = useAuth();
  const [clients, setClients] = useState<IClientResponse[]>([]);
  const [specifClient, setSpecificClient] = useState<IClientResponse>();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    api
      .get('/clients')
      .then((response) => {
        setClients(response.data.clients);
      })
      .catch((error) => {
        console.log(error);
        signOut();
      });
  }, [signOut]);

  async function handleAddClient(data: IClientResponse): Promise<void> {
    setClients([...clients, data]);
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  const parsedClients = useMemo(() => {
    return clients.map((client) => {
      return Object.assign(client, {
        formatPhone: client.phone_number
          ? phoneMask(client.phone_number)
          : null,
        formatStatus: client.status === 1 ? 'Ativo' : 'Inativo',
        formatCreatedAt: new Date(client.created_at).toLocaleDateString(
          'pt-Br',
        ),
        formatCpf: client.cpf_cnpj ? cpfMask(client.cpf_cnpj) : null,
      });
    });
  }, [clients]);

  const speficFormatedClient = useMemo(() => {
    return specifClient
      ? Object.assign(specifClient, {
          formatPhone: specifClient.phone_number
            ? phoneMask(specifClient.phone_number)
            : null,
          formatStatus: specifClient.status === 1 ? 'Ativo' : 'Inativo',
          formatCreatedAt: new Date(specifClient.created_at).toLocaleDateString(
            'pt-Br',
          ),
          formatCpf: specifClient?.cpf_cnpj
            ? cpfMask(specifClient.cpf_cnpj)
            : null,
        })
      : null;
  }, [specifClient]);

  const handleSelecChange = useCallback(
    (e) => {
      api
        .get(`clients/${e}`)
        .then((response) => {
          setSpecificClient(response.data);
        })
        .catch((error) => {
          console.log(error);
          signOut();
        });
    },
    [signOut],
  );

  const optionsSelect = useMemo(() => {
    return clients.map((client) => ({
      value: client.id,
      name: client.client_name,
    }));
  }, [clients]);

  return (
    <Container>
      <NavigateDrawer />
      <Content>
        <HeaderButtonAddClient>
          <button type="button" onClick={toggleModal}>
            Adicionar Cliente
          </button>
        </HeaderButtonAddClient>
        <ModalAddClient
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddClient={handleAddClient}
        />
        <SearchClient>
          <SelectSearch
            onChange={(e) => handleSelecChange(e)}
            options={optionsSelect}
            placeholder="Escolha o cliente"
            search
          />
          <button type="button" onClick={() => setSpecificClient(undefined)}>
            Limpar
          </button>
        </SearchClient>
        <ContainerTable>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cpf/Cnpj</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Data de Criação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {speficFormatedClient ? (
              <tr>
                <td>{speficFormatedClient.client_name}</td>
                <td>{speficFormatedClient.formatCpf}</td>
                <td>{speficFormatedClient.email}</td>
                <td>{speficFormatedClient.formatPhone}</td>
                <td>{speficFormatedClient.formatStatus}</td>
                <td>{speficFormatedClient.formatCreatedAt}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      console.log('teste');
                    }}
                  >
                    <FiEdit />
                    Editar
                  </button>
                </td>
              </tr>
            ) : (
              parsedClients.map((client) => (
                <tr key={client.id}>
                  <td>{client.client_name}</td>
                  <td>{client.formatCpf}</td>
                  <td>{client.email}</td>
                  <td>{client.formatPhone}</td>
                  <td>{client.formatStatus}</td>
                  <td>{client.formatCreatedAt}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        console.log('teste');
                      }}
                    >
                      <FiEdit />
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            )}
            {/*  */}
          </tbody>
        </ContainerTable>
      </Content>
    </Container>
  );
};

export default Clients;
