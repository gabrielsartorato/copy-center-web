import styled from 'styled-components';
import { shade } from 'polished';

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

export const HeaderButtonAddClient = styled.div`
  margin-left: auto;

  button {
    padding: 8px;
    background: #0000ff;
    border-radius: 8px;

    font-size: 20px;
    font-weight: 400;

    border: none;

    color: #ffffff;

    &:hover {
      background: ${shade(0.1, '#0000ff')};
    }
  }
`;

export const SearchClient = styled.div`
  display: flex;

  margin-top: 32px;
  width: 100%;
  height: 72px;

  background: #ffffff;

  border-radius: 8px;

  align-items: center;

  button[type='button'] {
    margin-left: 16px;
    border: none;
    background: red;

    padding: 8px;
    border-radius: 8px;

    width: 100px;

    color: #ffffff;
    font-weight: 500;
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

  tbody tr td button {
    display: flex;
    align-items: center;

    border: none;
    background: none;

    width: 100%;

    text-align: left;

    svg {
      margin-right: 8px;
      width: 24px;
      height: 24px;
    }
  }
`;
