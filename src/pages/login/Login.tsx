import { useContext, useEffect, useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { LoginDTO } from "../../model/LoginDTO";
import { useNavigate } from "react-router-dom";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  DivForm,
  ImageLogin,
  TitleLogin,
  LabelStyled,
  InputStyled,
  ButtonStyled,
  DescLogoImage,
  ContainerLogin,
  ContainerPageLogin,
} from "./Login.styles";
import {DivError} from "../users/Users.styles"
import { AuthContext } from "../../context/AuthContext";
import { AiFillEyeInvisible } from 'react-icons/ai'
import { AiFillEye } from 'react-icons/ai'
import * as Yup from 'yup';


function Login() {
  const {handleLogin} = useContext<any>(AuthContext);
  const navigate = useNavigate()
  const [passValue, setPassValue] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/')
    }
  }, [])
  
  const SignupSchema = Yup.object().shape({
    usuario: Yup.string()
    .required('Campo obrigatório!'),
  
    senha: Yup.string()
    .required('Campo obrigatório!')
  });

  return (
    <ContainerPageLogin>
      <ContainerLogin>
        <ImageLogin />
        <DescLogoImage>Vem Ser</DescLogoImage>
        <TitleLogin>Login VemSer</TitleLogin>
        <Formik
        initialValues={{
          usuario: '',
          senha: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(
          values: LoginDTO,
          { setSubmitting }: FormikHelpers<LoginDTO>
        ) => {
          if (values.usuario === 'admin' && values.senha === '123') {
            handleLogin(values)
            setSubmitting(false);
          } else {
            Notify.failure('Erro ao logar, confira os campos novamente!', {
              timeout: 2000
            });
          }
        }}  
      >
        {props => (
        <Form>
          <DivForm>
            <LabelStyled htmlFor="usuario">Usuário</LabelStyled>
            <Field as={InputStyled} name="usuario" id="usuario" placeholder="Digite o nome do usuário" />
            {props.errors.usuario && props.touched.usuario ? (
               <DivError>{props.errors.usuario}</DivError>
              ) : null}
          </DivForm>
          <DivForm>
            <LabelStyled htmlFor="senha">Senha</LabelStyled>
            <Field as={InputStyled} name="senha" id="senha" type={passValue ? 'password' : 'text'} placeholder="Digite a sua senha" />
            {props.errors.senha && props.touched.senha ? (
               <DivError>{props.errors.senha}</DivError>
              ) : null}
            {passValue ?
              <AiFillEyeInvisible onClick={() => setPassValue(false)} />
              : <AiFillEye onClick={() => setPassValue(true)} />
            }
          </DivForm>
          <ButtonStyled type='submit'>Entrar</ButtonStyled>
        </Form>
        )}
        </Formik>
      </ContainerLogin>
    </ContainerPageLogin>
  )
}

export default Login