import styled from 'styled-components';

export const ContainerUsers = styled.div`
  width: 100%;
  min-height: 667px;
  background-color: #F7F8FC;
  padding: 20px 30px;
`;

export const TitleUsers = styled.h1`
  font-size: 28px;
  margin-bottom: 30px;
  color: #252733;
`;

export const ContainerTable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.16);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.16);
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.16);;
`;

export const TableUsers = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
`;

export const HeadList = styled.div`
  display: grid;
  grid-template-columns: 300px 280px 180px auto;
  padding-left: 30px;
  border-bottom: 2px solid #DFE0EB;
`;

export const EachList = styled.p`
  color: #9FA2B4;
  font-size: 14px;
`;

export const InfoUsers = styled.div`
  display: grid;
  grid-template-columns: 300px 280px 180px 150px auto;
  border-bottom: 2px solid #DFE0EB;
  padding: 8px 0 8px 30px;
`;

export const EachDesc = styled.p`
  font-size: 14px;
`;

export const DivButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export const ButtonStyled = styled.button<{
  color: string,
  colorHover?: string,
  width?: string,
  height?: string,
  margin?: any,
 }>`
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => props.color};
  border-radius: 8px;
  margin: ${props => props.margin};

  :hover{
    background-color: ${props => props.colorHover};
  }
`;

export const CreateUserContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #F7F8FC;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #DFE0EB;
  height: 600px;
  width: 400px;
  padding: 10px 20px;
  border-radius: 8px;
  -webkit-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.16);
  -moz-box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.16);
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.16);;
`;

export const DivField = styled.div<{
  bot?: string,
}>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${props => props.bot};

`;

export const LabelCreate = styled.label`
  color: #5b5c61;
`;

export const InputCreate = styled.input`
  height: 22px;
`;

export const DivError = styled.div`
  color: red;
`;