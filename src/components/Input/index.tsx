import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useField } from '@unform/core';

import { IconBaseProps } from 'react-icons';

import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styles';
import { cpfMask } from '../../masks/cpfMask';
import { phoneMask } from '../../masks/phoneMask';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  mask?: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, mask, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [onFocused, setOnfocused] = useState<boolean>(false);
  const [onFilled, setIsFilled] = useState<boolean>(false);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleInputFocus = useCallback(() => {
    setOnfocused(!onFocused);
  }, [onFocused]);

  const handleInputBlur = useCallback(() => {
    if (mask === 'cpf') {
      inputRef.current!.value = cpfMask(inputRef.current!.value);
    }

    if (mask === 'phone') {
      inputRef.current!.value = phoneMask(inputRef.current!.value);
    }

    setOnfocused(!onFocused);

    setIsFilled(!!inputRef.current?.value);
  }, [onFocused, mask]);

  return (
    <Container isErrored={!!error} isFocus={onFocused} isFilled={onFilled}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
