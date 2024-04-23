import React, { useEffect, useState } from "react"
import { Table, Space, Button } from 'antd';
import { useNavigate } from 'react-router-dom'
import ContatoService from "../../../../Service/Contatos/ContatoService";


const contatosService = new ContatoService();

const GridContatoEditable = (idClienteContatos) => {

  const [contatos, setContatos] = useState([]);
  const getContatos = async () => {
    try {
      var response = await contatosService.getcontatosDeCliente(idClienteContatos.idClienteContatos);
      setContatos(response);
    } catch (error) {
      console.log(error);
      alert('Algo deu errado ao Carregar a lista de Contatos: ' + error)
    }
  }
  useEffect(() => {
    getContatos();
  }, []);

  const navigate = useNavigate()
  const onClickVicularContato = () => {
    navigate('/Vincularcontato/' + idClienteContatos.idClienteContatos
    )
  }


  const handleDesvincular = async (dados) => {
    var response = await contatosService.DesvincularConstato(dados);
    window.location.reload();

  }

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',

      render: (text) => <a>{text}</a>,
    },
    {
      title: 'E-mail',
      dataIndex: 'email',

    },
    {
      title: 'Telefone',
      dataIndex: 'telefone',

    },
    {
      title: 'Ação',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleDesvincular(record)}>Desvincular Contato</Button>
        </Space>
      ),
    },
  ];


  return (
    <>
      <Button onClick={() => onClickVicularContato()}>Novo Contato</Button>
      <Table
        columns={columns}
        dataSource={contatos}
        bordered
      />
    </>
  );

}
export default GridContatoEditable;