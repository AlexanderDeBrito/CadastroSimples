import axios from 'axios';

export default class ContatoService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_LOCAL_BASE + '/api'
    })
  }

  async getcontatos() {
    const { data } = await this.axios.get('/Contatos')
    return data;
  }

  async cadastrar(dados) {
    console.log(process.env.REACT_APP_API_LOCAL_BASE + '/api');
    return this.axios.post('Contatos/Cadastrar', dados)
  }

  async cadastrarContatos(dados) {
    console.log(process.env.REACT_APP_API_LOCAL_BASE + '/api');
    return this.axios.post('Contatos/Cadastrar', dados)
  }
}