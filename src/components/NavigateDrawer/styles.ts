import { Link, LinkProps } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface LinkPropsAttributes extends LinkProps {
  name: string;
  path: string;
}

export const MenuDrawer = styled.aside`
  width: 100%;
  max-width: 340px;
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
`;

export const NavigateLink = styled(Link)<LinkPropsAttributes>`
  margin-top: 16px;

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

  &:hover {
    background: #ffffe0;
  }

  ${(props) =>
    props.name === props.path &&
    css`
      background: #e6e6fa;
    `}
`;

export const Logout = styled.div`
  margin: 16px;

  button {
    background: #ffffff;

    width: 100%;
    padding: 16px;
    text-decoration: none;
    display: flex;
    align-items: center;
    border: none;

    border-radius: 10px;

    font-size: 24px;

    color: #696969;

    svg {
      margin-right: 28px;
    }
  }

  button:hover {
    background: #ffffe0;
  }
`;
