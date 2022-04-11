import styled from 'styled-components';
import LogoVemSer from '../../images/LogoDBC.jpg'

export const NavMenu = styled.nav`
  display: flex;
  justify-content: center;
`;

export const ListMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 0;
  gap: 30px;
`;

export const DivLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ImageLogo = styled.img.attrs({
  src: `${LogoVemSer}`
})`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  cursor: pointer;
`;

  export const LinkMenu = styled.a`
    color: #A4A6B3;
    text-decoration: none;

    :hover {
      color: #FFF;
    }
  `;