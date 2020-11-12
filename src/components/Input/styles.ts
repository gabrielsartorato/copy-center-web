import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  border: 1px solid #000000;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-left: 16px;
    color: #000000;
  }

  input {
    width: 90%;
    border: none;

    padding: 8px;
    height: 48px;
    width: 100%;

    border-radius: 10px;
  }
`;
