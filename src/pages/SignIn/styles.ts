import styled from 'styled-components';

import backgroundImage from '../../assets/backgroundImage.png';

export const Container = styled.div`
  background: url(${backgroundImage}) no-repeat center fixed;
  height: 100vh;
  display: flex;

  align-items: center;
`;

export const Content = styled.div`
  width: 460px;
  height: 300px;

  background: #ffffff;
  border-radius: 10px;

  margin: 0 auto;

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

export const Header = styled.div`
  height: 48px;
  background: #f1e6e6;
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    color: #000000;
  }
`;

export const ContainerForm = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  form {
    width: 340px;
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    div + div {
      margin-top: 24px;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;

      height: 36px;
      width: 100%;

      margin-top: 24px;
      border: none;

      background: #6202ee;
      border-radius: 200px;

      color: #ffffff;

      svg {
        margin-left: 16px;
        height: 24px;
      }
    }
  }
`;
