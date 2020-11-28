import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Form, CheckBoxGroup } from './styles';

import Modal from '../../../../components/Modal';
import Input from '../../../../components/Input';
import CheckboxInput from '../../../../components/InputCheckBox';

import api from '../../../../services/api';
import getValidationErrors from '../../../../utils/getValidationErros';
import { useToast } from '../../../../hooks/toast';

interface IProduct {
  id: string;
  product_name: string;
  price: number;
  use_height: number;
  use_width: number;
  created_at: Date;
  updated_at: Date;
  formatedPrice?: string;
  formatedHeight?: string;
  formatedWidth?: string;
}

interface IEditProduct {
  id: string;
  product_name: string;
  price: number;
  use_height: number;
  use_width: number;
  formatedPrice: any;
  height: string[];
  width: string[];
}

interface CheckboxOption {
  id: string;
  value: string;
  label: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateProduct: (client: IProduct) => void;
  editingProduct: IProduct;
}

const ModalEditProduct: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingProduct,
  handleUpdateProduct,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const checkboxHeight: CheckboxOption[] = [
    { id: 'height', value: 'height', label: 'Altura' },
  ];

  const checkboxWidth: CheckboxOption[] = [
    { id: 'width', value: 'width', label: 'Largura' },
  ];

  const handleSubmit = useCallback(
    async (data: IEditProduct) => {
      try {
        const formatValue = data.formatedPrice.replace(/[^\d]+/g, '') / 100;

        const schema = Yup.object().shape({
          product_name: Yup.string().required('Nome obrigatório'),
          formatedPrice: Yup.string().required('Preço obrigatório'),
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

        const response = await api.put(
          `/products/${editingProduct.id}`,
          dataForm,
        );

        handleUpdateProduct(response.data);
        setIsOpen();
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
    [handleUpdateProduct, editingProduct, setIsOpen, addToast],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingProduct}>
        <h1>Editar Cliente</h1>

        <Input name="product_name" placeholder="Nome do produto" />

        <Input mask="price" name="formatedPrice" placeholder="R$ 19,50" />

        <CheckBoxGroup>
          <CheckboxInput
            defaultChecked={editingProduct.use_height === 1}
            name="height"
            options={checkboxHeight}
          />

          <CheckboxInput
            defaultChecked={editingProduct.use_width === 1}
            name="width"
            options={checkboxWidth}
          />
        </CheckBoxGroup>

        <button type="submit">
          <div className="text">Editar Produto</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditProduct;
