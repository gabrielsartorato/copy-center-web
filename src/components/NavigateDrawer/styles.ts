import styled from 'styled-components';

export const MenuDrawer = styled.aside`
  width: 100%;
  max-width: 380px;
  height: 100vh;
  background: #ffffff;
`;

export const Divider = styled.div`
  width: 100%;
  height: 2px;
  background: #c0c0c0;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;

  h2 {
    margin-top: 16px;
    margin-left: 20px;
    margin-bottom: 16px;

    font-weight: 500;

    font-size: 32px;
    color: #000000;
  }

  strong {
    margin-left: 20px;
    margin-bottom: 32px;

    font-weight: normal;
    font-size: 16px;
    color: #000000;
  }
`;

export const NavigateMenu = styled.div`
  margin: 16px;

  a + a {
    margin-top: 16px;
  }

  a {
    padding: 16px;
    text-decoration: none;
    display: flex;
    align-items: center;

    border-radius: 10px;

    font-size: 24px;

    color: #696969;

    svg {
      margin-right: 28px;
    }
  }

  a:hover {
    background: #e6e6fa;
  }
`;

export const Logout = styled.div`
  margin: 16px;

  a {
    padding: 16px;
    text-decoration: none;
    display: flex;
    align-items: center;

    border-radius: 10px;

    font-size: 24px;

    color: #696969;

    svg {
      margin-right: 28px;
    }
  }

  a:hover {
    background: #e6e6fa;
  }
`;
