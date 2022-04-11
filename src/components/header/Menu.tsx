import { useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from 'react-icons/ai'
import { FiUser } from 'react-icons/fi'
import { TiLocationOutline } from 'react-icons/ti'


import { AuthContext } from "../../context/AuthContext";
import {ListMenu, LinkMenu} from "./Menu.styles"

function ItemMenu() {
  const {isToken} = useContext<any>(AuthContext)

  return (
    <nav>
      <ListMenu>
      { isToken ? (
        <>
          <Link to='/'><LinkMenu><AiOutlineHome /> Home</LinkMenu></Link>
          <Link to='/users'><LinkMenu><FiUser /> Users</LinkMenu></Link>
          <Link to='/address'><LinkMenu><TiLocationOutline /> Address</LinkMenu></Link>
        </>)
        : 
          <Link to='/login'><LinkMenu>Login</LinkMenu></Link>
        }
      </ListMenu>
    </nav>
  )
}
export default ItemMenu