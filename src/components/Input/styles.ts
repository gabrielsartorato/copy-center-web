import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface PropsContainer {
  isFocus: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<PropsContainer>`
  width: 100%;
  border: 1px solid #000000;
  border-radius: 10px;
  background: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-left: 16px;
    color: #000000;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocus &&
    css`
      border-color: #ba68c8;
      svg {
        color: #ba68c8;
      }
    `}

  ${(props) =>
    props.isFilled &&
    css`
      border-color: #ba68c8;
      svg {
        color: #ba68c8;
      }
    `}

  input {
    width: 90%;
    border: none;

    padding: 8px;
    height: 48px;
    width: 100%;

    border-radius: 10px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0 16px;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
