import { useContext} from "react";
import { AuthContext } from "../../context/AuthContext";

import {ContainerHeader, ButtonLogout} from "./Header.styles"
import Logo from "./Logo"
import Menu from "./Menu"

function Header() {
  const {handleLogout, isToken} = useContext<any>(AuthContext)

  return (
    <>
      { isToken && (
        <ContainerHeader>
          <Logo />
          <Menu />
          <ButtonLogout onClick={() => handleLogout()}>Deslogar</ButtonLogout>
        </ContainerHeader>
      )
      }
    </>
  )
}

export default Header