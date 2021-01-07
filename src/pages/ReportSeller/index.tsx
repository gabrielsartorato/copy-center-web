import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiArrowDown } from 'react-icons/fi';

import SelectSearch from 'react-select-search';
import NavigateDrawer from '../../components/NavigateDrawer';
import api from '../../services/api';

import {
  Container,
  Content,
  HeaderSale,
  ContainerSelect,
  ContainerSales,
  ContentSales,
  Order,
} from './styles';

interface IClient {
  id: string;
  client_name: string;
  cpf_cnpj: string;
  email: string;
  status: number;
}

interface IProduct {
  product_name: string;
}

interface IListProduct {
  id: string;
  quantity: number;
  price: number;
  height: number;
  width: number;
  product_id: IProduct;
}

interface IOrders {
  id: number;
  payment_status: number;
  status: number;
  total_price: string;
  description: string;
  created_at: Date;
  client: IClient;
  orders_products: IListProduct[];
}

interface IOpenOrder {
  id: number;
}

const ReportSeller: React.FC = () => {
  const [clients, setClients] = useState<IClient[]>([]);
  const [orders, setOrders] = useState<IOrders[]>([]);
  const [openOrders, setOpenOrders] = useState<number[]>([]);

  useEffect(() => {
    api.get('clients').then((response) => {
      setClients(response.data.clients);
    });
  }, []);

  useEffect(() => {
    api.get('orders').then((response) => {
      setOrders(response.data);
    });
  }, []);

  const optionsSelect = useMemo(() => {
    return clients.map((client) => ({
      value: client.id,
      name: client.client_name,
    }));
  }, [clients]);

  const handleOrderVisible = useCallback(
    (e) => {
      const findOrder = openOrders.find((order) => order === e);

      console.log(findOrder);

      if (findOrder) {
        const filteredOrder = openOrders.filter((order) => order !== findOrder);
        setOpenOrders(filteredOrder);
        return;
      }

      setOpenOrders([...openOrders, e]);
    },
    [openOrders],
  );

  console.log(openOrders);

  return (
    <Container>
      <NavigateDrawer />
      <Content>
        <HeaderSale>
          <ContainerSelect>
            <SelectSearch
              className="select-payment"
              options={optionsSelect}
              onChange={(e) => console.log(e)}
              placeholder="Selecione o cliente"
              search
            />
          </ContainerSelect>
        </HeaderSale>
        <ContainerSales>
          <ContentSales>
            {orders.map((order) => (
              <Order key={order.id}>
                <div>
                  <span>Pedido: {order.id}</span>
                  <span>Cliente: {order.client.client_name}</span>
                  <span>Data: {order.created_at}</span>
                  <span>R$ {order.total_price}</span>
                  <FiArrowDown
                    size={24}
                    onClick={() => handleOrderVisible(order.id)}
                  />
                </div>
                <div
                  style={
                    openOrders.includes(order.id)
                      ? { visibility: 'inherit', height: 'auto' }
                      : { visibility: 'hidden', height: 0 }
                  }
                >
                  {order.orders_products.map((product) => (
                    <ul>
                      <li>Nome: {product.product_id.product_name}</li>
                      <li>R$ 10,00</li>
                      <li>Quantidade: {product.quantity}</li>
                      <li>Altura: {product.height}</li>
                      <li>Largura: {product.width}</li>
                    </ul>
                  ))}
                </div>
              </Order>
            ))}
          </ContentSales>
        </ContainerSales>
      </Content>
    </Container>
  );
};

export default ReportSeller;
