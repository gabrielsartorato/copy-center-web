/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiArrowDown } from 'react-icons/fi';

import SelectSearch from 'react-select-search';
import NavigateDrawer from '../../components/NavigateDrawer';
import formatValue from '../../masks/moneyMask';
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

  const formatedSales = useMemo(() => {
    return orders.map((order) => ({
      ...order,
      formattedDate: new Date(order.created_at).toLocaleDateString('pt-Br'),
      formattedValue: formatValue(order.total_price),
      formattedStatus:
        order.status === 1
          ? 'Pago'
          : order.status === 2
          ? 'Pendente'
          : 'Cancelado',
    }));
  }, [orders]);

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
            {formatedSales.map((order) => (
              <Order key={order.id}>
                <table>
                  <tbody>
                    <tr>
                      <td>Pedido: {order.id}</td>
                      <td>Cliente: {order.client.client_name}</td>
                      <td>Data: {order.formattedDate}</td>
                      <td>R$ {order.formattedValue}</td>
                      <td>Status: {order.formattedStatus}</td>
                      <td>
                        <FiArrowDown
                          size={24}
                          onClick={() => handleOrderVisible(order.id)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div
                  style={
                    openOrders.includes(order.id)
                      ? { visibility: 'inherit', height: 'auto' }
                      : { visibility: 'hidden', height: 0 }
                  }
                >
                  <table>
                    <tbody>
                      {order.orders_products.map((product) => (
                        <tr key={product.id}>
                          <td>Nome: {product.product_id.product_name}</td>
                          <td>{formatValue(product.price)}</td>
                          <td>Quantidade: {product.quantity}</td>
                          <td>Altura: {product.height || 0} cm</td>
                          <td>Largura: {product.width || 0} cm</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
