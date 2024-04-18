import React, {useState} from 'react'
import { Container, Form, SubContainerSign } from './styles'
import Input from '../../components/Input/index'
import Botao from '../../components/Botao/index'
import { validarEmail, validarSenha } from '../../Utils/validadores'
import UserService from '../../Service/UserService'
import { NavLink, useNavigate } from 'react-router-dom'

const userService = new UserService()

const Login = () => {
  const [loading = false, setLoading] = useState()
  const [form, setForm] = useState([])
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    console.log("passou")
    event.preventDefault();
    try {
      setLoading(true)
      const response = await userService.login(form)
      console.log('response do Login', response)
      if (response === true) {
        alert('usuário Logado com Sucesso')
        navigate('/home')
      }
      setLoading(false)
    }
    catch (err) {
      alert('Algo deu errado com o Login' + err)
    }
  }

  const handleChange = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const validadorInput = () => {
    return validarEmail(form.nomeDeUsuario) && validarSenha(form.senha)
  }

  return (
    <Container>
      <Form>
        <h1>Faça o seu Login 👋</h1>
        <Input
          name='nomeDeUsuario'
          placeholder='Digite o seu e-mail'
          onChange={handleChange}
          type='email'
        />
        <Input
          name='senha'
          placeholder='Digite a sua senha'
          onChange={handleChange}
          type='password'
        />
        <Botao
          type='submit'
          text='Entrar!'
          onClick={handleSubmit}
          // disabled={loading === true || !validadorInput()}
        />
        <SubContainerSign>
          <p>Não possui conta?</p>
          <NavLink to="cadastrar">Cadastrar</NavLink>
        </SubContainerSign>
      </Form>
    </Container>
    
  )
}

export default Login;