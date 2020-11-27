import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

interface Products {
  id: string;
  product_name: string;
  price: number;
  use_height: number;
  use_width: number;
  created_at: Date;
  updated_at: Date;
}

const Products: React.FC = () => {
  const { signOut } = useAuth();

  const [products, setProducts] = useState<Products[]>([]);
  const [speficProduct, setSpeficProduct] = useState<Products>();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);

  useEffect(() => {
    api
      .get('/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
        signOut();
      });
  }, [signOut]);

  const toggleAddModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  async function handleAddProducts(data: any): Promise<void> {
    console.log('testestring');
  }

  const selectOptionProducts = useMemo(() => {
    return products.map((product) => ({
      value: product.id,
      name: product.product_name,
    }));
  }, [products]);

  const formatProduts = useMemo(() => {
    return products.map((product) => {
      return Object.assign(product, {
        formatedPrice: Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(product.price),
        formatedHeight: product.use_height === 1 ? 'Sim' : 'Não',
        formatedWidth: product.use_width === 1 ? 'Sim' : 'Não',
      });
    });
  }, [products]);

  const specificFormatedProduct = useMemo(() => {
    return speficProduct
      ? Object.assign(speficProduct, {
          formatedPrice: Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(speficProduct.price),
          formatedHeight: speficProduct.use_height === 1 ? 'Sim' : 'Não',
          formatedWidth: speficProduct.use_width === 1 ? 'Sim' : 'Não',
        })
      : null;
  }, [speficProduct]);

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
            options={selectOptionProducts}
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
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {formatProduts ? (
              formatProduts.map((product) => (
                <tr>
                  <td>{product.product_name}</td>
                  <td>{product.formatedPrice}</td>
                  <td>{product.formatedHeight}</td>
                  <td>{product.formatedWidth}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>Não há serviços cadastrados</td>
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
