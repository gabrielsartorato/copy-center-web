import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SelectSearch from 'react-select-search';
import { FiEdit } from 'react-icons/fi';
import NavigateDrawer from '../../components/NavigateDrawer';

import ModalAddProduct from './Components/ModalAddProduct';
import ModalEditProduct from './Components/ModalEditProduct';

import {
  Container,
  Content,
  HeaderButtonAddProduct,
  SearchProduct,
  ContainerTable,
} from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

interface IProduct {
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

  const [products, setProducts] = useState<IProduct[]>([]);
  const [speficProduct, setSpeficProduct] = useState<IProduct>();
  const [editingProduct, setEditingProduct] = useState<IProduct>(
    {} as IProduct,
  );

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

  const toggleEditModal = useCallback(() => {
    setModalEditOpen(!modalEditOpen);
  }, [modalEditOpen]);

  const handleAddProducts = useCallback(
    (data: any) => {
      setProducts([...products, data]);
    },
    [products],
  );

  const handleSelectProduct = useCallback(
    (e) => {
      const productFind = products.find((product) => product.id === e);

      setSpeficProduct(productFind);
    },
    [products],
  );

  const editProdut = useCallback(
    (product: IProduct) => {
      setEditingProduct(product);
      toggleEditModal();
    },
    [toggleEditModal],
  );

  const handleEditProduct = useCallback(
    (data: IProduct) => {
      const findIndex = products.findIndex((product) => product.id === data.id);

      products[findIndex] = data;

      setProducts([...products]);
    },
    [products],
  );

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
        <ModalEditProduct
          isOpen={modalEditOpen}
          setIsOpen={toggleEditModal}
          editingProduct={editingProduct}
          handleUpdateProduct={handleEditProduct}
        />
        <SearchProduct
          modalCreateOpen={modalOpen}
          modalEditOpen={modalEditOpen}
        >
          <SelectSearch
            options={selectOptionProducts}
            placeholder="Escolha o serviço"
            onChange={(e) => handleSelectProduct(e)}
            search
          />
          <button type="button" onClick={() => setSpeficProduct(undefined)}>
            Limpar
          </button>
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
            {specificFormatedProduct ? (
              <tr>
                <td>{specificFormatedProduct.product_name}</td>
                <td>{specificFormatedProduct.formatedPrice}</td>
                <td>{specificFormatedProduct.formatedHeight}</td>
                <td>{specificFormatedProduct.formatedWidth}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => editProdut(specificFormatedProduct)}
                  >
                    <FiEdit />
                    Editar
                  </button>
                </td>
              </tr>
            ) : (
              formatProduts.map((product) => (
                <tr key={product.id}>
                  <td>{product.product_name}</td>
                  <td>{product.formatedPrice}</td>
                  <td>{product.formatedHeight}</td>
                  <td>{product.formatedWidth}</td>
                  <td>
                    <button type="button" onClick={() => editProdut(product)}>
                      <FiEdit />
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </ContainerTable>
      </Content>
    </Container>
  );
};

export default Products;
