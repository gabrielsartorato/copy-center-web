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

import { Container, Content, ContainerItems, ContainerSeller } from './styles';

import './stylescss.css';

interface IProduct {
  id: string;
  product_name: string;
  price: number;
  use_height: number;
  use_width: number;
  created_at: Date;
  updated_at: Date;
}

const Seller: React.FC = () => {
  const { signOut } = useAuth();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [speficProduct, setSpeficProduct] = useState<IProduct>();
  const formRef = useRef<FormHandles>(null);

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

  const handleSubmitFormProduct = useCallback(
    async (data) => {
      console.log(data, speficProduct);
    },
    [speficProduct],
  );

  return (
    <Container>
      <NavigateDrawer />
      <Content>
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
              </div>
              <button type="submit">Adicionar</button>
            </Form>
          </section>
        </ContainerItems>
        <ContainerSeller />
      </Content>
    </Container>
  );
};

export default Seller;
