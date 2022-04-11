import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AddressContext } from "../../context/AddressContext";
import { UserContext } from "../../context/UserContext";
import Loading from "../../components/Loading";
import {
  Card,
  CardDesc,
  Container,
  CardTitle,
} from "./Home.styles"

function Home() {
  const {notLoged} = useContext<any>(AuthContext);
  const {getAddressApi, addressLength} = useContext<any>(AddressContext);
  const {getUsers, usersLength} = useContext<any>(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    notLoged();
    getUsers();
    getAddressApi();
    setLoading(false);
  }, []);

  if (loading) {
    return (<Loading />);
  }

  return (
    <Container>
      <Card>
        <CardTitle>Pessoas</CardTitle>
        <CardDesc>{usersLength}</CardDesc>
        <span>Pessoas Cadastradas</span>
      </Card>
      <Card>
        <CardTitle>Endereços</CardTitle>
        <CardDesc>{addressLength}</CardDesc>
        <span>Endereços Cadastrados</span>
      </Card>
    </Container>
  )
}

export default Home