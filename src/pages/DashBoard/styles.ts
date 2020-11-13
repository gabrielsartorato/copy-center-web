import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  display: flex;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ContentInformation = styled.section`
  display: flex;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;

  width: 150px;
  height: 150px;
  border-radius: 10px;
  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
    linear-gradient(0deg, #f9f2f2, #f9f2f2);

  margin-top: 18px;
  margin-left: 80px;

  align-items: center;

  border: 1px solid #000000;

  svg {
    margin-top: 16px;
    width: 50px;
    height: 50px;
    color: #696969;
  }

  h3 {
    margin-top: 16px;
    color: #000000;
    font-weight: 400;
    font-size: 18px;
  }

  p {
    margin-top: 8px;
    color: #000000;
  }
`;

export const ContentTable = styled.section`
  margin-top: 80px;
  margin-left: 80px;

  width: 100%;
  max-width: 1150px;
  height: 500px;

  border-radius: 30px;

  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
    linear-gradient(0deg, #f9f2f2, #f9f2f2);
`;
