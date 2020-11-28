import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Form, CheckBoxGroup } from './styles';

import { useToast } from '../../../../hooks/toast';

import Modal from '../../../../components/Modal';
import Input from '../../../../components/Input';
import CheckboxInput from '../../../../components/InputCheckBox';

import api from '../../../../services/api';
import getValidationErrors from '../../../../utils/getValidationErros';

interface IProduct {
  id: string;
  product_name: string;
  price: number;
  height: number;
  width: number;
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

        const schema = Yup.object().shape({
          product_name: Yup.string().required('Nome obrigatório'),
          price: Yup.string().required('Preço obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const dataForm = {
          product_name: data.product_name,
          price: formatValue,
          use_height: data.height[0] ? 1 : 0,
          use_width: data.width[0] ? 1 : 0,
        };

        const response = await api.post('/products', dataForm);

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

  const checkboxHeight: CheckboxOption[] = [
    { id: 'height', value: 'height', label: 'Altura' },
  ];

  const checkboxWidth: CheckboxOption[] = [
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

        <CheckBoxGroup>
          <CheckboxInput name="height" options={checkboxHeight} />

          <CheckboxInput name="width" options={checkboxWidth} />
        </CheckBoxGroup>
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
