import styled from 'styled-components';
import LogoVemSer from '../../images/LogoVemSer.jpg'

export const ContainerPageLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 667px;
  width: 100%;
  background-color: #363740;
`;

export const ContainerLogin = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #FFF;
  min-height: 400px;
  min-width: 300px;
  border: none;
  border-radius: 6px;
  align-items: center;
  padding: 20px 8px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.16);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.16);
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.16);
`;

export const ImageLogin = styled.img.attrs({
  src: `${LogoVemSer}`
})`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.32);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.32);
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.32);
`;

export const DescLogoImage = styled.p`
  color: #A4A6B3;
`;

export const TitleLogin = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

export const DivForm = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 10px 0;

  svg {
    position: absolute;
    font-size: 20px;
    right: 20px;
    bottom: 6px;
    color: #9FA2B4;
    cursor: pointer;

    :hover {
      color: #4242cc;
    }
  }
`;

export const LabelStyled = styled.label`
  color: #9FA2B4;
  font-size: 14px;
`;

export const InputStyled = styled.input`
  height: 30px;
  width: 260px;
  border: none;
  background-color: #FCFDFE;
  border-radius: 8px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.16);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.16);
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.16);

  ::placeholder {
    color: #A4A6B3;
  }

`;

export const ButtonStyled = styled.button`
  width: 268px;
  height: 40px;
  margin-top: 20px;
  background-color: #3751FF;
  border-radius: 6px;
  color: white;
  border: none;
  cursor: pointer;

  :hover {
    background-color: #343e81;
  }
`;