import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form, CheckBoxGroup } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import api from '../../services/api';
import CheckboxInput from '../InputCheckBox';

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

  const checkboxHeight: CheckboxOption[] = [
    { id: 'height', value: 'height', label: 'Altura' },
  ];

  const checkboxWidth: CheckboxOption[] = [
    { id: 'width', value: 'width', label: 'Largura' },
  ];

  const handleSubmit = useCallback(
    async (data: IEditProduct) => {
      const formatValue = data.formatedPrice.replace(/[^\d]+/g, '') / 100;

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
    },
    [handleUpdateProduct, editingProduct, setIsOpen],
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
