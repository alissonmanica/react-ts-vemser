import {FC, createContext, useState, useEffect, ReactNode} from 'react';
import { useNavigate } from 'react-router-dom';
import { Notify } from 'notiflix';

import { LoginDTO } from '../model/LoginDTO';
import api from '../api';
import Loading from '../components/Loading';
import Error from '../components/Error';

export const AuthContext = createContext({})

const AuthProvider: FC<ReactNode>= ({children}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isToken, setIsToken] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = token;
      setIsToken(true);
    } else {
      navigate('/login')
    }
    setLoading(false)
  }, []);

  const handleLogin = async(user: LoginDTO) => {
    try {
      const {data} = await api.post('/auth', user);
      api.defaults.headers.common['Authorization'] = data;
      localStorage.setItem('token', data);
      setIsToken(true)
      Notify.success('Logado com sucesso!', {
        timeout: 1000
      });
      navigate('/')
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(true)
      console.log(error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsToken(false);
    navigate('/login');
    setLoading(false);
  }

  const notLoged = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
    }

  if (loading) {
    return (<Loading />)
  }

  if (error) {
    return (<Error />)
  }

  return (
    <AuthContext.Provider value={{handleLogin, handleLogout, notLoged, isToken}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider