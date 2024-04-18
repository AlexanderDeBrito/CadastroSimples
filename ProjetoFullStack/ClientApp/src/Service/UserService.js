import axios from 'axios';

export default class UserServices {
  constructor () {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_LOCAL_BASE + '/api'
    })
  }

  async login (dados) {
    const {data} = await this.axios.post('/Login', dados)

    if (data) {
      localStorage.setItem("nome", data.nome)
      localStorage.setItem("nomeDeUsuario", data.email)
      //criar token
      localStorage.setItem("token", "#tokenDeAcesso")

      return true
    }

    return
  }

  async cadastrar (dados) {
    console.log(process.env.REACT_APP_API_LOCAL_BASE + '/api');
    return this.axios.post('Login/Cadastrar', dados)
  }

  usuarioAutenticado () {
    return localStorage.getItem("token") != undefined ? true : false
    // return typeof localStorage.getItem("token")
  }

  //Desafio ---> implemente um botão que chama essa função dentro da página Home
  async logout () {
    localStorage.removeItem("token")
    localStorage.removeItem("nome")
    localStorage.removeItem("email")
  }
}