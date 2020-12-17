import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  display: flex;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;

  padding: 16px;
`;

export const ContainerItems = styled.div`
  padding: 16px;

  box-sizing: border-box;

  max-width: 800px;
  width: 100%;
  height: 800px;

  border-radius: 16px;

  background: white;

  section {
    display: flex;
    flex-direction: column;

    div + form {
      margin-top: 8px;
    }

    #input-group {
      display: flex;

      div + div {
        margin-left: 16px;
      }

      div:nth-last-child(1) {
        width: 312px;
      }
    }
  }
`;

export const ContainerSeller = styled.div`
  max-width: 400px;
  width: 100%;
  height: 800px;

  border-radius: 16px;

  margin-left: 16px;

  background: white;
`;
