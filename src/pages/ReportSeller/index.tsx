/* eslint-disable prettier/prettier */
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
  const [specifcClient, setSpecifcClient] = useState<IClient>();
  const [specifcOrders, setSpecifcOrders] = useState<IOrders[]>([]);

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

  const handleSelecChange = useCallback(
    (e) => {
      const findClient = clients.find((client) => client.id === e);

      const specifOrders = orders.filter((order) => order.client.id === e);

      setSpecifcOrders(specifOrders);

      setSpecifcClient(findClient);
    },
    [clients, orders],
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

  const formatedSpecifOrderClient = useMemo(() => {
    return specifcOrders.map((order) => ({
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
  }, [specifcOrders]);

  return (
    <Container>
      <NavigateDrawer />
      <Content>
        <HeaderSale>
          <ContainerSelect>
            <SelectSearch
              className="select-payment"
              options={optionsSelect}
              onChange={(e) => handleSelecChange(e)}
              placeholder="Selecione o cliente"
              search
            />
          </ContainerSelect>
        </HeaderSale>
        <ContainerSales>
          <ContentSales>
            {specifcClient
              ? formatedSpecifOrderClient.map((order) => (
                <Order key={order.id}>
                  <table>
                    <tbody>
                      <tr>
                        <th>Pedido: {order.id}</th>
                        <th>Cliente: {order.client.client_name}</th>
                        <th>Data: {order.formattedDate}</th>
                        <th>{order.formattedValue}</th>
                        <th>Status: {order.formattedStatus}</th>
                        <th>
                          <FiArrowDown
                            size={24}
                            onClick={() => handleOrderVisible(order.id)}
                          />
                        </th>
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
                            <th>Nome: {product.product_id.product_name}</th>
                            <th>{formatValue(product.price)}</th>
                            <th>Quantidade: {product.quantity}</th>
                            <th>Altura: {product.height || 0} cm</th>
                            <th>Largura: {product.width || 0} cm</th>
                          </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </Order>
                ))
              : formatedSales.map((order) => (
                <Order key={order.id}>
                  <table>
                    <tbody>
                      <tr>
                        <th>Pedido: {order.id}</th>
                        <th>Cliente: {order.client.client_name}</th>
                        <th>Data: {order.formattedDate}</th>
                        <th>{order.formattedValue}</th>
                        <th>Status: {order.formattedStatus}</th>
                        <th>
                          <FiArrowDown
                            size={24}
                            onClick={() => handleOrderVisible(order.id)}
                          />
                        </th>
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
                            <th>Nome: {product.product_id.product_name}</th>
                            <th>{formatValue(product.price)}</th>
                            <th>Quantidade: {product.quantity}</th>
                            <th>Altura: {product.height || 0} cm</th>
                            <th>Largura: {product.width || 0} cm</th>
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
