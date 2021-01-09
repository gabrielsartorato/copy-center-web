import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  padding: 16px;
`;

export const HeaderSale = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ContainerSelect = styled.div`
  padding: 16px;

  background: #ffffff;

  border-radius: 8px;
`;

export const ContainerFilter = styled.div`
  width: 100%;
  margin-top: 16px;

  section {
    width: 100%;

    padding: 16px;

    background: #ffffff;

    border-radius: 8px;

    form {
      display: flex;

      div + div {
        margin-left: 8px;
      }

      input[type='date']:before {
        content: attr(placeholder) !important;
        color: #aaa;
        margin-right: 0.5em;
      }
      input[type='date']:focus:before,
      input[type='date']:valid:before {
        content: '';
      }

      button[type='submit'] {
        height: 50px;
        margin-left: 8px;
        border: none;
        background: #1976d2;
        border-radius: 8px;
        color: #ffffff;
        width: 30%;
      }
    }
  }
`;

export const ContainerSales = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentSales = styled.div`
  padding: 16px;
  margin-top: 16px;

  background: #ffffff;

  border-radius: 8px;

  section + section {
    margin-top: 8px;
  }
`;

export const Order = styled.section`
  display: flex;
  flex-direction: column;

  padding: 8px;
  width: 100%;

  background: #87cefa;

  border-radius: 8px;

  table {
    table-layout: fixed;
    width: 100%;
  }

  table tr th {
    text-align: left;
  }

  table tr th:last-child {
    text-align: right;

    svg {
      cursor: pointer;
    }
  }

  div {
    background: #ffffff;
    color: black;
    border-radius: 8px;

    table {
      padding: 8px;
    }

    table tr th {
      text-align: center;
    }
  }
`;
