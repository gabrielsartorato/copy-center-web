import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FiArrowDown, FiCheck, FiTrash2 } from 'react-icons/fi';
import { isAfter, isBefore, isSameDay } from 'date-fns';

import SelectSearch from 'react-select-search';
import Input from '../../components/Input';
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
  ContainerFilter,
} from './styles';

import './stylescss.css';
import { useToast } from '../../hooks/toast';

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
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const [clients, setClients] = useState<IClient[]>([]);
  const [orders, setOrders] = useState<IOrders[]>([]);
  const [openOrders, setOpenOrders] = useState<number[]>([]);
  const [specifcClient, setSpecifcClient] = useState<IClient>();
  const [specifcOrders, setSpecifcOrders] = useState<IOrders[]>([]);
  const [selectPaymentType, setSelectPaymentType] = useState<number>(0);

  const [initialDate, setInitialData] = useState<Date | number>(0);
  const [finalDate, setFinalData] = useState<Date | number>(0);

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

  const optionsSelectPayment = [
    { value: '1', name: 'Pago' },
    { value: '2', name: 'Pendente' },
    { value: '3', name: 'Cancelado' },
  ];

  const formatedSales = useMemo(() => {
    let filteredOrders: IOrders[] = [];
    if (specifcClient) {
      filteredOrders = orders.filter(
        (order) => order.client.id === specifcClient.id,
      );

      if (initialDate && finalDate) {
        filteredOrders = filteredOrders
          .filter((order) => isAfter(new Date(order.created_at), initialDate))
          .filter(
            (order) =>
              isSameDay(new Date(order.created_at), finalDate) ||
              isBefore(new Date(order.created_at), finalDate),
          );
      }

      if (selectPaymentType) {
        filteredOrders = filteredOrders.filter(
          (order) => Number(order.status) === Number(selectPaymentType),
        );
      }

      return filteredOrders.map((order) => ({
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
    }

    if (initialDate && finalDate) {
      filteredOrders = orders
        .filter((order) => isAfter(new Date(order.created_at), initialDate))
        .filter(
          (order) =>
            isSameDay(new Date(order.created_at), finalDate) ||
            isBefore(new Date(order.created_at), finalDate),
        );

      if (selectPaymentType) {
        filteredOrders = filteredOrders.filter(
          (order) => Number(order.status) === Number(selectPaymentType),
        );
      }

      return filteredOrders.map((order) => ({
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
    }

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
  }, [orders, selectPaymentType, specifcClient, initialDate, finalDate]);

  const handleSubimit = useCallback(
    (data) => {
      if (data.initialData > data.finalData) {
        addToast({
          title: 'Data Incorreta',
          type: 'error',
          description: 'Data inicial deve ser menor que data final',
        });
      }

      const splitedInicialData = data.initialData.split('-');
      const splitedFinalData = data.finalData.split('-');
      const initialFormattedDate = new Date(
        splitedInicialData[0],
        splitedInicialData[1] - 1,
        splitedInicialData[2],
      );
      const finalFormattedDate = new Date(
        splitedFinalData[0],
        splitedFinalData[1] - 1,
        splitedFinalData[2],
      );

      setInitialData(initialFormattedDate);
      setFinalData(finalFormattedDate);
    },
    [addToast],
  );

  const handleSelecChangeClient = useCallback(
    (e) => {
      const findClient = clients.find((client) => client.id === e);

      const specifOrders = orders.filter((order) => order.client.id === e);

      setSpecifcOrders(specifOrders);

      setSpecifcClient(findClient);
    },
    [clients, orders],
  );

  const handleSelectPaymentStatys = useCallback((e) => {
    setSelectPaymentType(e);
  }, []);

  const handleOrderVisible = useCallback(
    (e) => {
      const findOrder = openOrders.find((order) => order === e);

      if (findOrder) {
        const filteredOrder = openOrders.filter((order) => order !== findOrder);
        setOpenOrders(filteredOrder);
        return;
      }

      setOpenOrders([...openOrders, e]);
    },
    [openOrders],
  );

  const handleClearFilter = useCallback(() => {
    setSpecifcOrders([]);
    setSpecifcClient({} as IClient);
    setSelectPaymentType(0);
  }, []);

  const handlePayOrder = useCallback(
    async (id) => {
      const data = {
        status: 1,
      };

      await api.patch(`orders/${id}`, data);

      const findIndexOrder = orders.findIndex((order) => order.id === id);
      const findOrder = orders.find((order) => order.id === id);

      const findIndexOrderSpecifc = specifcOrders.findIndex(
        (order) => order.id === id,
      );
      const findOrderSpecific = specifcOrders.find((order) => order.id === id);

      if (!findOrder || !findOrderSpecific) {
        alert('Order não encontrada');
        return;
      }

      orders[findIndexOrder] = {
        ...findOrder,
        status: 2,
      };

      specifcOrders[findIndexOrderSpecifc] = {
        ...findOrderSpecific,
        status: 1,
      };

      setOrders([...orders]);
      setSpecifcOrders([...specifcOrders]);
    },
    [orders, specifcOrders],
  );

  const handleCancelOrder = useCallback(
    async (id) => {
      const result = window.confirm(`Deseja realment cancelar a ordem: ${id}`);

      if (!result) {
        return;
      }

      await api.patch(`orders/cancel/${id}`);

      const findOrder = orders.find((order) => order.id === id);

      if (!findOrder) {
        alert('Order não encontrada');
        return;
      }

      Object.assign(findOrder, { status: 3 });

      const filteredOrders = orders.filter((order) => order.id !== id);
      const filteredSpecifOrders = specifcOrders.filter(
        (order) => order.id !== id,
      );

      setOrders([...filteredOrders, findOrder]);
      setSpecifcOrders([...filteredSpecifOrders, findOrder]);
    },
    [orders, specifcOrders],
  );

  return (
    <Container>
      <NavigateDrawer />
      <Content>
        <HeaderSale>
          <ContainerSelect>
            <SelectSearch
              className="select-report"
              value={specifcClient?.id}
              options={optionsSelect}
              onChange={(e) => handleSelecChangeClient(e)}
              placeholder="Selecione o cliente"
              search
            />
            <SelectSearch
              className="select-report"
              options={optionsSelectPayment}
              onChange={(e) => handleSelectPaymentStatys(e)}
              placeholder="Selecione o status pagamento"
              search
            />
          </ContainerSelect>
        </HeaderSale>
        <ContainerFilter>
          <section>
            <Form ref={formRef} onSubmit={handleSubimit}>
              <Input
                name="initialData"
                type="date"
                placeholder="Data Inicial"
              />
              <Input name="finalData" type="date" placeholder="Data Final" />

              <button type="submit">Filtar</button>
              <button onClick={handleClearFilter} type="button">
                Limpar
              </button>
            </Form>
          </section>
        </ContainerFilter>
        <ContainerSales>
          <ContentSales>
            {formatedSales.map((order) => (
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
                        <i>
                          <button
                            onClick={() => handlePayOrder(order.id)}
                            disabled={order.status === 1}
                            style={
                              order.status === 1 || order.status === 3
                                ? { cursor: 'default', background: '#d3d3d3' }
                                : { background: '#1976d2', cursor: 'pointer' }
                            }
                            name="pay-button"
                            type="button"
                          >
                            <FiCheck size={24} />
                            Pagar
                          </button>
                        </i>
                      </th>
                      <th>
                        <i>
                          <button
                            name="cancel-button"
                            type="button"
                            disabled={order.status === 3}
                            style={
                              order.status === 3
                                ? { cursor: 'default', background: '#d3d3d3' }
                                : { background: '#ff4040', cursor: 'pointer' }
                            }
                            onClick={() => handleCancelOrder(order.id)}
                          >
                            <FiTrash2 size={24} />
                            Cancelar
                          </button>
                        </i>
                      </th>
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
