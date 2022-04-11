import { Link } from "react-router-dom"
import {DivLogo, LinkMenu, ImageLogo} from "./Menu.styles"

function Logo() {
  return (
    <DivLogo>
      <Link to='/'><ImageLogo /></Link>
      <Link to="/"><LinkMenu>Vem Ser</LinkMenu></Link>
    </DivLogo>
  )
}
export default Logo