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


  
  async getcontatosSemVinculo() {
    const { data } = await this.axios.get('/Contatos/ContatosSemVinculos')
    return data;
  }

  async getcontatosDeCliente(idCliente) {
    const { data } = await this.axios.get('/Contatos/ContatoDeClientes/' + idCliente)
    return data;
  }

  async cadastrar(dados) {
    return this.axios.post('/Contatos', dados)
  }

  async cadastrarContatoCliente(dados, idCliente) {

    const clientes = [];
    dados.forEach(function (contato) {

      const data = ({
        ClienteId: idCliente,
        nome: contato.nomeContato,
        Telefone: contato.telefone,
        email: contato.email,
      })
      clientes.push(data)

    });
    return this.axios.post('/Contatos/SaveContatos', clientes)
  }

  async Atualizar(dados) {
    this.axios.put('/Contatos/' + dados.id, dados);
    return true;
  }

  async vincularContato(clienteId,dados) {
    this.axios.put('/Contatos/VincularCliente/' + clienteId, dados);
    return true;
  }

  async Deletar(id) {
    this.axios.delete('/Contatos/' + id);
    return true;
  }

  async DesvincularConstato(contato) {
    const data = ({
      ClienteId: 0,
      id:contato.id,
      nome: contato.nome,
      Telefone: contato.telefone,
      email: contato.email,
    })

    this.axios.put('/Contatos/' + contato.id,data);
    return true;
  }
}