import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { AuthContext } from "../../context/AuthContext";
import { AddressContext } from "../../context/AddressContext";
import Loading from "../../components/Loading";
import {
  HeadList,
  EachList,
  EachDesc,
  InfoUsers,
  LogradouroDesc,
} from "./Address.styles"

import {
  DivButton,
  TitleUsers,
  TableUsers,
  ButtonStyled,
  ContainerUsers,
  ContainerTable,
} from "../users/Users.styles"



function Address() {
  const navigate = useNavigate()
  const {notLoged} = useContext<any>(AuthContext);
  const {getAddressApi, deleteAddress, loading, setLoading, setButtonName, address} = useContext<any>(AddressContext);
  
  function handleDelete(id: number) {
    Confirm.show(
      'DBC',
      'Deseja mesmo deletar o endereço?',
      'Sim',
      'Não',
      () => {
        deleteAddress(id)
        Notify.success('Endereço deletado com sucesso!', {
          timeout: 2000
        });
        getAddressApi()
      },
      () => {
        Notify.failure('Deletação cancelada!', {
          timeout: 2000
        });
      },
      {
      },
      );
  }


  useEffect(() => {
    notLoged();
    getAddressApi();
  }, []);
  
  if (loading) {
    return (<Loading />)
  }

  return (
    <ContainerUsers>
          <TitleUsers>Address</TitleUsers>
        <DivButton>
          <ButtonStyled color="#3faf31" colorHover="#58e4ae" width="200px" height="30px" margin="0px 0px 20px 0px" type="button" onClick={() => (setButtonName('Cadastrar'), navigate("/create-address"))}>Cadastrar</ButtonStyled>
        </DivButton>
        <ContainerTable>
        <TableUsers>
          <HeadList>
            <EachList>CEP</EachList>
            <EachList>Logradouro</EachList>
            <EachList>Numero</EachList>
            <EachList>Complemento</EachList>
            <EachList>Cidade</EachList>
            <EachList>Estado</EachList>
            <EachList>Pais</EachList>
            <EachList>Tipo</EachList>
          </HeadList>
          {address.map((add: any) => (
            <InfoUsers key={add.idEndereco}>
              <EachDesc>{add.cep}</EachDesc>
              <LogradouroDesc>{add.logradouro}</LogradouroDesc>
              <EachDesc>{add.numero}</EachDesc>
              <EachDesc>{add.complemento}</EachDesc>
              <EachDesc>{add.cidade}</EachDesc>
              <EachDesc>{add.estado}</EachDesc>
              <EachDesc>{add.pais}</EachDesc>
              <EachDesc>{add.tipo}</EachDesc>
              <DivButton>
                <ButtonStyled color="#4c96eb" colorHover="#e4e725" width="120px" type="button" onClick={() => (setButtonName('Atualizar'), setLoading(true), navigate(`/create-address/${add.idEndereco}`))}>Atualizar</ButtonStyled>
                <ButtonStyled color="#b42e2e" colorHover="#f10c0c" width="120px" type="button" onClick={() => handleDelete(add.idEndereco)}>Deletar</ButtonStyled>
              </DivButton>
            </InfoUsers>
          ))}
        </TableUsers>
      </ContainerTable>
    </ContainerUsers>
  )
}

export default Address