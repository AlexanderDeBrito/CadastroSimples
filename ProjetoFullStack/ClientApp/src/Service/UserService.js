import axios from 'axios';

export default class UserServices {
  constructor () {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_LOCAL_BASE + '/api'
    })
  }

  async login (dados) {
    const {data} = await this.axios.post('/Login', dados)

    if (data.id > 0) {
      localStorage.setItem("nome", data.nome)
      localStorage.setItem("nomeDeUsuario", data.email)      
      // localStorage.setItem("token", "data.token")

      return true
    }

    return
  }

  async cadastrar (dados) {    
    return this.axios.post('Login/Cadastrar', dados)
  }

  usuarioAutenticado () {
    return  true
    //Implementar Token se der tempo
    //localStorage.getItem("token") != undefined ? true : false
    
  }

  //Desafio ---> implemente um botão que chama essa função dentro da página Home
  async logout () {
    localStorage.removeItem("token")
    localStorage.removeItem("nome")
    localStorage.removeItem("email")
  }
}