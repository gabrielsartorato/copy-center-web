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
import { object } from 'yup';
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
  quantity: number;
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
  const [clients, setClients] = useState<IClient[]>([]);
  const [specifClient, setSpecifcClient] = useState<IClient>();
  const [products, setProducts] = useState<IProduct[]>([]);
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

  const totalPrice = useMemo(() => {
    const total = cart.reduce((acc, product) => {
      return acc + product.price;
    }, 0);

    return formatValue(String(total));
  }, [cart]);

  console.log(totalPrice);

  const handleSpecifcClient = useCallback(
    (e) => {
      const specific = clients.find((client) => client.id === e);
      setSpecifcClient(specific);
    },
    [clients],
  );

  const handleSubmitFormProduct = useCallback(
    async (data) => {
      const formatPrice = data.price.replace(/[^\d]+/g, '');
      const price =
        data.width && data.height
          ? (data.width * data.height * formatPrice * data.quantity) / 100
          : (data.quantity * formatPrice) / 100;

      const formattedProduct = {
        id: speficProduct!.id,
        product_name: speficProduct!.product_name,
        use_height: speficProduct!.use_height,
        use_width: speficProduct!.use_width,
        created_at: speficProduct!.created_at,
        updated_at: speficProduct!.updated_at,
        ...speficProduct,
        price: price / 100,
        formatPrice: formatValue(String(price)),
        quantity: data.quantity,
      };

      setCart([...cart, formattedProduct]);
    },
    [speficProduct, cart],
  );

  return (
    <Container>
      <NavigateDrawer />
      <Content>
        <ContainerClientAndProducts>
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
                  <Input name="width" placeholder="Comprimento em cm" />
                  <Input name="height" placeholder="Largura em cm" />
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
          <ContainerItems>
            <ContainerClient>
              <SelectSearch
                className="select-products"
                options={optionsSelect}
                onChange={(e) => handleSpecifcClient(e)}
                placeholder="Selecione o produto"
                search
              />
            </ContainerClient>

            <header>{specifClient?.client_name}</header>
            <section>
              <table>
                <thead>
                  <tr>
                    <th>Qtd</th>
                    <th>Produto</th>
                    <th>Preço</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product) => (
                    <tr key={product.id}>
                      <td>{product.quantity}</td>
                      <td>{product.product_name}</td>
                      <td>{product.formatPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>-----------------------------------------------------------</p>
              <p>{totalPrice}</p>
            </section>
          </ContainerItems>
        </ContainerSeller>
      </Content>
    </Container>
  );
};

export default Seller;
