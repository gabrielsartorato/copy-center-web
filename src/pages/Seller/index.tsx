import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import SelectSearch from 'react-select-search';
import Input from '../../components/Input';
import NavigateDrawer from '../../components/NavigateDrawer';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import formatValue from '../../masks/moneyMask';

import {
  Container,
  Content,
  ContainerClientAndProducts,
  ContainerClient,
  ContainerItems,
  ContainerSeller,
} from './styles';

import './stylescss.css';

interface IProduct {
  id: string;
  product_name: string;
  price: number;
  use_height: number;
  use_width: number;
  formatPrice: string;
  created_at: Date;
  updated_at: Date;
}

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

const Seller: React.FC = () => {
  const { signOut } = useAuth();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [clients, setClients] = useState<IClient[]>([]);
  const [specifClient, setSpecifcClient] = useState<IClient>();
  const [speficProduct, setSpeficProduct] = useState<IProduct>();
  const [cart, setCart] = useState<IProduct[]>([]);
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    api
      .get('/products')
      .then((response) => {
        const formatProducts = response.data.map((product: IProduct) => ({
          ...product,
          formatPrice: formatValue(product.price),
        }));
        setProducts(formatProducts);
      })
      .catch((error) => {
        console.log(error);
        signOut();
      });
  }, [signOut]);

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

  useEffect(() => {
    formRef.current?.setData({ price: speficProduct?.formatPrice });
  }, [speficProduct]);

  const handleSelectProduct = useCallback(
    (e) => {
      const productFind = products.find((product) => product.id === e);

      setSpeficProduct(productFind);
    },
    [products],
  );

  const selectOptionProducts = useMemo(() => {
    return products.map((product) => ({
      value: product.id,
      name: product.product_name,
    }));
  }, [products]);

  const optionsSelect = useMemo(() => {
    const activeClients = clients.filter((client) => client.status !== 0);
    return activeClients.map((client) => ({
      value: client.id,
      name: client.client_name,
    }));
  }, [clients]);

  const handleSubmitFormProduct = useCallback(
    async (data) => {
      const formatPrice = data.price.replace(/[^\d]+/g, '');
      const totalPrice =
        data.width && data.height
          ? (data.width * data.height * formatPrice * data.quantity) / 100
          : (data.quantity * formatPrice) / 100;

      console.log(totalPrice);

      const formatProduct = {
        ...speficProduct,
        price: totalPrice,
      };

      console.log(formatProduct);
    },
    [speficProduct],
  );

  const handleSpecifcClient = useCallback(
    (e) => {
      const specific = clients.find((client) => client.id === e);
      setSpecifcClient(specific);
    },
    [clients],
  );

  return (
    <Container>
      <NavigateDrawer />
      <Content>
        <ContainerClientAndProducts>
          <ContainerClient>
            <SelectSearch
              className="select-products"
              options={optionsSelect}
              onChange={(e) => handleSpecifcClient(e)}
              placeholder="Selecione o produto"
              search
            />
          </ContainerClient>
          <ContainerItems>
            <section>
              <SelectSearch
                className="select-products"
                options={selectOptionProducts}
                onChange={(e) => handleSelectProduct(e)}
                placeholder="Selecione o produto"
                search
              />

              <Form ref={formRef} onSubmit={handleSubmitFormProduct}>
                <div id="input-group">
                  <Input name="width" placeholder="Comprimento" />
                  <Input name="height" placeholder="Largura" />
                  <Input
                    className="input-quantity"
                    name="quantity"
                    placeholder="Quantidade"
                  />
                  <Input
                    mask="price"
                    name="price"
                    placeholder="Preço Unitário"
                  />
                </div>
                <button name="add-product" type="submit">
                  Adicionar Produto
                </button>
              </Form>
            </section>
          </ContainerItems>
        </ContainerClientAndProducts>
        <ContainerSeller>
          <header>{specifClient?.client_name}</header>
          <p>-----------------------------------------------------------</p>
          <table>
            <thead>
              <tr>
                <th>Qtd</th>
                <th>Produto</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Plotagem preto e branco</td>
                <td>R$ 1800,00</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Plotagem preto e branco</td>
                <td>R$ 1800,00</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Plotagem preto e branco</td>
                <td>R$ 1800,00</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Plotagem preto e branco</td>
                <td>R$ 1800,00</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Plotagem preto e branco</td>
                <td>R$ 1800,00</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Plotagem preto e branco</td>
                <td>R$ 1800,00</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Plotagem preto e branco</td>
                <td>R$ 1800,00</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Plotagem preto e branco</td>
                <td>R$ 1800,00</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Plotagem preto e branco</td>
                <td>R$ 1800,00</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Plotagem preto e branco</td>
                <td>R$ 1800,00</td>
              </tr>
            </tbody>
          </table>
          <p>-----------------------------------------------------------</p>
        </ContainerSeller>
      </Content>
    </Container>
  );
};

export default Seller;
