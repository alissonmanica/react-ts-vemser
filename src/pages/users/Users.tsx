import { useContext, useEffect} from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";

import Loading from "../../components/Loading";
import {
  EachList,
  EachDesc,
  HeadList,
  DivButton,
  InfoUsers,
  TitleUsers,
  TableUsers,
  ButtonStyled,
  ContainerUsers,
  ContainerTable,
} from "./Users.styles"

function Users() {
  const {notLoged} = useContext<any>(AuthContext);
  const {loading, setLoading, people, getUsers, deleteUsers, setButtonName} = useContext<any>(UserContext)
  const navigate = useNavigate()

  
function handleDelete(id: number) {
  Confirm.show(
    'DBC',
    'Deseja mesmo deletar o usuário?',
    'Sim',
    'Não',
    () => {
      deleteUsers(id)
      Notify.success('Usuario deletado com sucesso!', {
        timeout: 2000
      });
      getUsers()
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

  function cpfFormat(cpf: string) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
 }

  
  useEffect(() => {
    notLoged();
    getUsers();
  }, []);
  
  if (loading) {
    return (<Loading />)
  }

  return (
    <ContainerUsers>
      <TitleUsers>Pessoas</TitleUsers>
      <DivButton>
        <ButtonStyled color="#3faf31" colorHover="#58e4ae" width="200px" height="30px" margin="0px 0px 20px 0px" type="button" onClick={() => (setButtonName('Cadastrar'), navigate("/create-user"))}>Cadastrar</ButtonStyled>
      </DivButton>
      <ContainerTable>
        <TableUsers>
          <HeadList>
            <EachList>Nome</EachList>
            <EachList>Email</EachList>
            <EachList>CPF</EachList>
            <EachList>Data de Nascimento</EachList>
          </HeadList>
          {people.map((user: any) => (
            <InfoUsers key={user.idPessoa}>
              <EachDesc>{user.nome}</EachDesc>
              <EachDesc>{user.email}</EachDesc>
              <EachDesc>{cpfFormat(user.cpf)}</EachDesc>
              <EachDesc>{moment(user.dataNascimento).format('DD/MM/YYYY')}</EachDesc>
              <DivButton>
                <ButtonStyled color="#4c96eb" colorHover="#e4e725" width="120px" type="button" onClick={() => (setButtonName('Atualizar'), setLoading(true), navigate(`/create-user/${user.idPessoa}`))}>Atualizar</ButtonStyled>
                <ButtonStyled color="#b42e2e" colorHover="#f10c0c" width="120px" type="button" onClick={() => handleDelete(user.idPessoa)}>Deletar</ButtonStyled>
              </DivButton>
            </InfoUsers>
          ))}
        </TableUsers>
      </ContainerTable>
    </ContainerUsers>
  )
}

export default Users