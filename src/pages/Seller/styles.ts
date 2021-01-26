import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  display: flex;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;

  padding: 16px;

  position: relative;
`;

export const ContainerClientAndProducts = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContainerClient = styled.div`
  padding: 16px;

  max-width: 800px;
  width: 100%;

  max-height: 200px;

  border-radius: 16px;

  background: white;

  margin-bottom: 16px;
`;

export const ContainerItems = styled.div`
  padding: 16px;

  max-width: 900px;
  width: 100%;

  max-height: 210px;

  border-radius: 16px;

  background: white;

  section {
    display: flex;
    flex-direction: column;

    div + form {
      margin-top: 8px;
    }

    button[name='add-product'] {
      margin-top: 8px;
      width: 100%;
      height: 48px;

      border: none;
      border-radius: 10px;

      background: #1976d2;

      font-size: 24px;
      font-weight: 400;
      color: #ffffff;
    }

    #input-group {
      display: flex;

      div + div {
        margin-left: 16px;
      }

      div:nth-child(1) {
        width: 350px;
      }

      div:nth-child(2) {
        width: 350px;
      }
    }
  }
`;

export const ContainerCart = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContainerSeller = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;

  max-width: 420px;
  width: 100%;

  border-radius: 16px;

  background: white;

  padding: 16px;
  color: #000000;

  section {
    padding: 8px;
    border-radius: 16px;
    background: #f9f7db;
  }

  textarea {
    margin-top: 8px;
    width: 100%;
    border-radius: 8px;
    padding: 8px;

    resize: none;

    height: 80px;
  }

  header {
    font-size: 24px;
    margin-bottom: 8px;
  }

  table td,
  th {
    text-align: left;
    padding: 0.5rem;
  }

  table th:nth-child(1) {
    width: 5%;
  }

  table th:nth-child(2) {
    width: 45%;
  }

  table th:nth-child(3) {
    width: 20%;
  }

  button[name='end-seller'] {
    margin-top: 8px;
    width: 100%;
    height: 48px;

    border: none;
    border-radius: 10px;

    background: #1976d2;

    font-size: 24px;
    font-weight: 400;
    color: #ffffff;
  }

  button[name='clear-seller'] {
    margin-top: 8px;
    width: 100%;
    height: 48px;

    border: none;
    border-radius: 10px;

    background: #ff4040;

    font-size: 24px;
    font-weight: 400;
    color: #ffffff;
  }
`;
