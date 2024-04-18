import axios from 'axios';
import ClienteService from './Clientes/ClienteService';
import ContatoService from './Contatos/ContatoService';

const clientesService = new ClienteService();
const ccontatoService = new ContatoService();

export default class ClienteContatoService {
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_LOCAL_BASE + '/api'
    })
  }


  async cadastrarClienteContato(dados) {

    console.log(process.env.REACT_APP_API_LOCAL_BASE + '/api');
    return this.axios.post('Clientes/Cadastrar', dados)
  }
}