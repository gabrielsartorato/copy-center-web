import React, { useCallback, useState } from 'react';
import SelectSearch from 'react-select-search';
import NavigateDrawer from '../../components/NavigateDrawer';

import ModalAddProduct from '../../components/ModalAddProduct';

import {
  Container,
  Content,
  HeaderButtonAddProduct,
  SearchProduct,
  ContainerTable,
} from './styles';

const Products: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);

  const options = [
    { name: 'Swedish', value: 'sv' },
    { name: 'English', value: 'en' },
  ];

  const toggleAddModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  async function handleAddProducts(data: any): Promise<void> {
    console.log('testestring');
  }

  return (
    <Container>
      <NavigateDrawer />
      <Content>
        <HeaderButtonAddProduct>
          <button type="button" onClick={() => setModalOpen(!modalOpen)}>
            Adicionar Serviço
          </button>
        </HeaderButtonAddProduct>
        <ModalAddProduct
          isOpen={modalOpen}
          setIsOpen={toggleAddModal}
          handleAddProduct={handleAddProducts}
        />
        <SearchProduct
          modalCreateOpen={modalOpen}
          modalEditOpen={modalEditOpen}
        >
          <SelectSearch
            options={options}
            placeholder="Escolha o serviço"
            search
          />
          <button type="button">Limpar</button>
        </SearchProduct>
        <ContainerTable>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Altura</th>
              <th>Largura</th>
            </tr>
          </thead>
          <tbody>
            {!products && (
              <tr>
                <td>Sem Produtos Cadastrados</td>
              </tr>
            )}
            {/* <tr>
              <td>Nome</td>
              <td>Cpf/Cnpj</td>
              <td>Email</td>
              <td>Telefone</td>
            </tr> */}
          </tbody>
        </ContainerTable>
      </Content>
    </Container>
  );
};

export default Products;
