import {FC, createContext, useState, ReactNode } from "react";
import api from "../api";
import Error from "../components/Error";
import { AddressDTO } from "../model/AddressDTO";

export const AddressContext = createContext({})

const AddressProvider: FC<ReactNode>= ({children}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [address, setAddress] = useState<AddressDTO['address']>([]);
  const [buttonName, setButtonName] = useState('Cadastrar');
  const [addressLength, setAddressLength] = useState(0);

  const getAddressApi = async () => {
    try {
      const {data} = await api.get('endereco');
      setAddress(data);
      setLoading(false);
      const lengthData = data.length;
      setAddressLength(lengthData);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  }

  const deleteAddress = async (id: number) => {
    try {
      await api.delete(`endereco/${id}`);
      getAddressApi();
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  }
  
  if (error) {
    return (<Error />)
  }

  return (
    <AddressContext.Provider value={{loading, setLoading, address, deleteAddress, getAddressApi, buttonName, setButtonName, addressLength}}>
      {children}
    </AddressContext.Provider>
  )
}

export default AddressProvider;