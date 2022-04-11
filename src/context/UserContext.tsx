import {FC, createContext, useState, ReactNode } from "react";
import api from "../api";
import Error from "../components/Error";
import { PeopleDTO } from "../model/PeopleDTO";

export const UserContext = createContext({});

const UserProvider: FC<ReactNode>= ({children}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [people, setPeople] = useState<PeopleDTO['pessoa']>([]);
  const [buttonName, setButtonName] = useState('Cadastrar');
  const [usersLength, setUsersLength] = useState(0);

  const getUsers = async () => {
    try {
      const {data} = await api.get('/pessoa');
      setPeople(data);
      setLoading(false);
      const dataLength = data.length;
      setUsersLength(dataLength);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  }

  const deleteUsers = async (id: number) => {
    try {
      await api.delete(`pessoa/${id}`);
      getUsers();
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  }
  
  if (error) {
    return (<Error />);
  }

  return (
    <UserContext.Provider value={{loading, setLoading, people, deleteUsers, getUsers, buttonName, setButtonName, usersLength}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;