import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface SearcheClient {
  modalCreateOpen: boolean;
  modalEditOpen: boolean;
}

export const Container = styled.div`
  width: 100vw;
  display: flex;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px 80px;
  flex: 1;
`;

export const HeaderButtonAddProduct = styled.div`
  margin-left: auto;

  button {
    padding: 8px;
    background: #1976d2;
    border-radius: 8px;

    font-size: 20px;
    font-weight: 400;

    border: none;

    color: #ffffff;

    &:hover {
      background: ${shade(0.1, '#1976d2')};
    }
  }
`;

export const SearchProduct = styled.div<SearcheClient>`
  display: flex;

  margin-top: 32px;
  width: 100%;
  height: 72px;

  background: #ffffff;

  border-radius: 8px;

  align-items: center;

  ${(props) =>
    props.modalCreateOpen &&
    css`
      .select-search {
        visibility: hidden;
      }
    `}

  ${(props) =>
    props.modalEditOpen &&
    css`
      .select-search {
        visibility: hidden;
      }
    `}

  button[type='button'] {
    margin-left: 16px;
    border: none;
    background: #dc004e;

    padding: 8px;
    border-radius: 8px;

    width: 100px;

    color: #ffffff;
    font-weight: 500;

    &:hover {
      background: ${shade(0.1, '#dc004e')};
    }
  }
`;

export const ContainerTable = styled.table`
  margin-top: 32px;
  background: #ffffff;
  padding: 8px;

  border-radius: 8px;

  thead tr th {
    padding: 16px;
    color: #808080;
    text-align: left;
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  }

  tbody tr {
    display: table-row;
    color: #263238;
  }

  tbody td {
    padding: 16px;
    text-align: left;
    font-weight: 400;
    line-height: 1.43;
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  }

  tbody tr td:last-child {
    display: flex;
  }

  tbody tr td button {
    display: flex;
    align-items: center;

    padding: 8px;

    border: none;
    background: #87ceeb;

    width: 100%;

    text-align: left;

    border-radius: 8px;

    svg {
      margin-right: 8px;
      width: 24px;
      height: 24px;
    }
  }

  tbody tr td button[name='inative'] {
    background: red;

    border-radius: 8px;
    padding: 8px;

    color: #ffffff;
  }
`;
