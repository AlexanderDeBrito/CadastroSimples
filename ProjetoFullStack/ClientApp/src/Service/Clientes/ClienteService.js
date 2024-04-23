import axios from 'axios';

export default class ClienteService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_LOCAL_BASE + '/api'
    })
  }

  async getclientes() {
    const { data } = await this.axios.get('/Clientes')
    return data;
  }

  async cadastrar(dados) {
    return this.axios.post('/Clientes/Cadastrar', dados)
  }

  async Atualizar(dados) {
    this.axios.put('/Clientes/' + dados.id, dados);
    return true;
  }

  async Deletar(id) {
    this.axios.delete('/Clientes/' + id);
    return true;
  }
}