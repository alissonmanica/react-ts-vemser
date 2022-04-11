import styled from 'styled-components';

export const ContainerHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  background-color: #363740;
  min-height: 637px;
  min-width: 200px;
  padding-top: 30px;
`;

export const ButtonLogout = styled.button`
  width: 160px;
  height: 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #3751FF;

  :hover {
    background-color: #424fa1;
  }
`;