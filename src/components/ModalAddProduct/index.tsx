import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Form } from './styles';

import Modal from '../Modal';
import Input from '../Input';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErros';
import { useToast } from '../../hooks/toast';
import CheckboxInput from '../InputCheckBox';

interface IProduct {
  id: string;
  product_name: string;
  price: number;
  height: number;
  width: number;
}

interface ICreateClientData {
  product_name: string;
  price: number;
  use_height: string;
  use_width: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddProduct: (client: IProduct) => void;
}

interface CheckboxOption {
  id: string;
  value: string;
  label: string;
}

const ModalAddProduct: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddProduct,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        const formatValue = data.price.replace(/[^\d]+/g, '') / 100;

        const dataForm = {
          product_name: data.product_name,
          price: formatValue,
          use_height: data.checkbox[0] ? 1 : 0,
          use_width: data.checkbox[1] ? 1 : 0,
        };

        const response = await api.post('/products', dataForm);

        console.log(response.data);

        setIsOpen();

        handleAddProduct(response.data);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          console.log(errors);
          return;
        }

        console.log(error.response.data);

        setIsOpen();

        addToast({
          type: 'error',
          title: 'Erro ao fazer o cadastro',
          description:
            'Ocorreu um erro ao tentar fazer o cadastro, cliente já existente.',
        });
      }
    },
    [setIsOpen, handleAddProduct, addToast],
  );

  const checkboxOptions: CheckboxOption[] = [
    { id: 'height', value: 'height', label: 'Altura' },
    { id: 'width', value: 'width', label: 'Largura' },
  ];

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Serviço</h1>

        <Input name="product_name" placeholder="Digite o nome do Serviço" />

        <Input
          mask="price"
          name="price"
          placeholder="Digite o preço do produto "
        />

        <CheckboxInput name="checkbox" options={checkboxOptions} />

        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Serviço</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddProduct;
