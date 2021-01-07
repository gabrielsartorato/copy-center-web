import styled, { css } from 'styled-components';

interface IContentSales {
  open: boolean;
}

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

  div {
    display: flex;
    justify-content: space-between;
  }

  div + div {
    display: flex;
    flex-direction: column;
    /* visibility: hidden;
    height: 0; */
    margin-top: 8px;
    background: #ffffff;
    color: black;

    border-radius: 8px;

    ul {
      display: flex;
      padding: 8px;

      justify-content: space-between;
      width: 100%;
    }

    ul li {
      list-style: none;
    }

    .visibility {
      visibility: inherit;
      height: auto;
    }
  }
`;

export const Products = styled.div`
  width: 100%;
  height: 8px;

  background: #87cefa;

  border-radius: 8px;
  margin-top: 4px;
`;
