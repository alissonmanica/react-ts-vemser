import { useContext, useEffect, useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import MaskedInput from "react-text-mask";
import axios from "axios";
import * as Yup from 'yup';

import { AuthContext } from "../../context/AuthContext";
import { EnderecoDTO } from "../../model/EnderecoDTO";
import api from "../../api"
import Loading from "../../components/Loading";
import {
  DivButtonForm,
} from "./Address.styles";

import {
  DivError,
  DivField,
  ButtonStyled,
  FormContainer,
  CreateUserContainer,
} from "../users/Users.styles";
import { AddressContext } from "../../context/AddressContext";

const SignupSchema = Yup.object().shape({
  cep: Yup.string()
  .min(8, 'Deve conter 9 dígitos (00000-000)')
  .max(9, 'Deve conter 9 dígitos (00000-000)')
  .required('Campo obrigatório!'),

  logradouro: Yup.string()
    .min(2, 'Muito Curto')
    .max(50, 'Muito Longo')
    .required('Campo obrigatório!'),

  numero: Yup.number()
  .required('Campo obrigatório!')
  .positive()
  .integer(),


  localidade: Yup.string()
  .min(3, 'Muito Curto!')
  .max(50, 'Muito Longo!')
  .required('Campo obrigatório!'),

  uf: Yup.string()
  .min(2, 'Deve conter apenas 2 digitos!')
  .max(2, 'Deve conter apenas 2 digitos!')
  .required('Campo obrigatório!'),

  pais: Yup.string()
  .min(2, 'Muito Curto!')
  .max(50, 'Muito Longo!')
  .required('Campo obrigatório!'),

  tipo: Yup.string()
  .required('Campo obrigatório!')
});

function CreateAddress() {
  const {notLoged} = useContext<any>(AuthContext);
  const {buttonName, setButtonName, loading, setLoading} = useContext<any>(AddressContext);
  const [dataAddress, setDataAddress] = useState({});
  const {cep, logradouro, numero, complemento, cidade, estado, pais, tipo}: any = dataAddress;

  const {id} = useParams();
  const navigate = useNavigate();

  const maskCep = [
    /[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/
  ];

  const getAddress = async (values: EnderecoDTO, setFieldValue: any) => {
    try {
      const {data} = await axios.get(`https://viacep.com.br/ws/${values.cep}/json/`);
      const {logradouro, localidade, uf} = data;
      setFieldValue('logradouro', logradouro);
      setFieldValue('localidade', localidade);
      setFieldValue('uf', uf);
    } catch (error) {
      console.log(error)
    }
  }

  const postAddress = async (values: EnderecoDTO) => {
    const endereco = {
      tipo: values.tipo,
      logradouro: values.logradouro,
      numero: parseInt(values.numero),
      complemento: values.complemento,
      cep: values.cep,
      cidade: values.localidade,
      estado: values.uf,
      pais: values.pais,
    }
    try {
      const {data} = await api.post('endereco/2', endereco)
      Notify.success('Endereço cadastrado com sucesso!', {
        timeout: 2000
      });
      setTimeout(() => {
        navigate('/address');
      }, 2000);
    } catch (error) {
      console.log(error)
      Notify.failure('erro ao cadastrar endereço!', {
        timeout: 2000
      });
    }
  }

  const getInfoAddress = async () => {
    try {
      const {data} = await api.get(`/endereco/${id}`)
      setDataAddress(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  const putAddress = async (addressAlterado: any) => {
    try {
      await api.put(`/endereco/${id}`, addressAlterado);
      Notify.success('Endereço atualizado com sucesso!', {
        timeout: 2000
      });
      setTimeout(() => {
        navigate('/address');
      }, 2000);
    } catch (error) {
      console.log(error)
      Notify.failure('Erro ao atualizar Endereço!', {
        timeout: 2000
      });
    }
  }

  useEffect(() => {
    notLoged();
    if (buttonName === 'Atualizar') {
      getInfoAddress()
    }
  }, []);
  
  if (loading) {
    return (<Loading />)
  }

  return (
    <CreateUserContainer>
      <Formik
        initialValues={buttonName === 'Atualizar' ? ({
          cep: cep,
          logradouro: logradouro,
          numero: numero,
          complemento: complemento,
          localidade: cidade,
          uf: estado,
          pais: pais,
          tipo: tipo,
        })
        : {
          cep: '',
          logradouro: '',
          numero: '',
          complemento: '',
          localidade: '',
          uf: '',
          pais: '',
          tipo: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values: EnderecoDTO,
          { setSubmitting }: FormikHelpers<EnderecoDTO>
          ) => {
            setSubmitting(false);
            values.cep = values.cep.replaceAll('-', '')
             if (buttonName === 'Atualizar') {
               const addressAlterado = {
                 idEndereco: id,
                 cep: values.cep,
                 logradouro: values.logradouro,
                 numero: values.numero,
                 complemento: values.complemento,
                 cidade: values.localidade,
                 estado: values.uf,
                 pais: values.pais,
                 tipo: values.tipo
               }
               putAddress(addressAlterado)
               setButtonName('Cadastrar')
             } else if (buttonName === 'Cadastrar') {
               postAddress(values)
             } else {
              Notify.failure('Erro confira os campos novamente!', {
                timeout: 2000
              });
             }
        }}
      >
        { props => (
        <Form>
          <FormContainer>
            <DivField bot="20px">
              <label htmlFor="cep">CEP</label>
              <Field id="cep" name="cep" placeholder="CEP" render={({ field }: any) => (
                  <MaskedInput
                    {...field}
                    mask={maskCep}
                    id="dataNascimento"
                    placeholder="digite sua Data de Nascimento"
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    className={
                      props.errors.cep && props.touched.cep
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                )}/>
              <button type="button" onClick={() => getAddress(props.values, props.setFieldValue)}>Buscar CEP</button>
              {props.errors.cep && props.touched.cep ? (
               <DivError>{props.errors.cep}</DivError>
              ) : null}
            </DivField>

            <DivField bot="20px">
              <label htmlFor="logradouro">Logradouro</label>
              <Field id="logradouro" name="logradouro" placeholder="Logradouro" />
              {props.errors.logradouro && props.touched.logradouro ? (
               <DivError>{props.errors.logradouro}</DivError>
              ) : null}
            </DivField>

            <DivField bot="20px">
              <label htmlFor="numero">Numero</label>
              <Field id="numero" name="numero" placeholder="Numero" />   
              {props.errors.numero && props.touched.numero ? (
              <DivError>{props.errors.numero}</DivError>
              ) : null}
            </DivField>

            <DivField bot="20px">
              <label htmlFor="complemento">Complemento</label>
              <Field id="complemento" name="complemento" placeholder="Complemento" />  
            </DivField>

            <DivField bot="20px">
              <label htmlFor="localidade">Cidade</label>
              <Field id="localidade" name="localidade" placeholder="Cidade" />  
              {props.errors.localidade && props.touched.localidade ? (
              <DivError>{props.errors.localidade}</DivError>
              ) : null}
            </DivField>

            <DivField bot="20px">
              <label htmlFor="uf">Estado</label>
              <Field id="uf" name="uf" placeholder="Estado" />  
              {props.errors.uf && props.touched.uf ? (
              <DivError>{props.errors.uf}</DivError>
              ) : null}
            </DivField>

            <DivField bot="20px">
              <label htmlFor="pais">País</label>
              <Field id="pais" name="pais" placeholder="País" />  
              {props.errors.pais && props.touched.pais ? (
              <DivError>{props.errors.pais}</DivError>
           ) : null}
            </DivField>

            <DivField bot="20px">
              <label htmlFor="tipo">Tipo</label>
              <Field as="select" id="tipo" name="tipo">
                <option value=''></option>
                <option value="RESIDENCIAL">Residencial</option>
                <option value="COMERCIAL">Comercial</option>
              </Field> 
              {props.errors.tipo && props.touched.tipo ? (
              <DivError>{props.errors.tipo}</DivError>
           ) : null}
            </DivField>
          <DivButtonForm>
            <ButtonStyled color="#4f7fe7" colorHover="#237c7c" width="200px" height='30px' type="submit">{buttonName}</ButtonStyled>    
          </DivButtonForm>
          </FormContainer>
        </Form>
        )}
      </Formik>
    </CreateUserContainer>
  )
}

export default CreateAddress