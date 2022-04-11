import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #dddddd;
  gap: 40px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FFF;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 8px -1px rgba(0,0,0,0.27);
  -moz-box-shadow: 0px 0px 8px -1px rgba(0,0,0,0.27);
  box-shadow: 0px 0px 8px -1px rgba(0,0,0,0.27);
  padding: 20px;
  width: 300px;
  height: 200px;
`; 

export const CardTitle = styled.h1`
  color: #9FA2B4;
  font-size: 40px;
`;

export const CardDesc = styled.p`
  color: #5454e7;
  font-size: 30px;
  margin: 0 0 20px 0px;
`;