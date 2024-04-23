import React, { useEffect, useState } from "react"
import { Table, Typography, Button, ConfigProvider, Space, Divider, Form } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';
import ClienteService from "../../../Service/Clientes/ClienteService";
import { useNavigate } from 'react-router-dom'
import ModalCliente from "../../../components/Modal/ModalFormCliente";
import GridContatoEditable from "../Contato/Componente/GridContatoEditable";

const clientesService = new ClienteService();
const initialValue = { id: 0, nome: 'teste', email: '', telefone: '', dataRegistro: '' }

const { Title } = Typography;
const ButtonColor = ['#6253E1', '#04BEFE'];
const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const GridCliente = () => {
  const [clientes, setClientes] = useState([]);
  const [dadosCliente, setDadoscliente] = useState(initialValue);
  const [modalOpen, setmodalOpen] = useState(false);

  const getClientes = async () => {
    try {
      var response = await clientesService.getclientes();

      setClientes(response);
    } catch (error) {
      console.log(error);
      alert('Algo deu errado ao Carregar a lista de Clientes: ' + error)
    }
  }

  const navigate = useNavigate()
  const novoCliente = async () => {
    navigate('/CadastrarCliente')
  }

  const handleDelete = async (dados) => {
    var response = await clientesService.Deletar(dados.key);
    window.location.reload();

  }

  const handleDados = async (dados) => {

    setmodalOpen(true);
    setDadoscliente(dados);
  }

  useEffect(() => {
    getClientes();
  }, [])

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
          <Button onClick={() => handleDados(record)}>Editar {record.name}</Button>
          <Button onClick={() => handleDelete(record)}>Deletar</Button>
        </Space>
      ),
    },
  ];

  const data = [];
  for (let i = 0; i < clientes.length; i++) {
    data.push({
      key: clientes[i].id,
      nome: clientes[i].nome,
      email: clientes[i].email,
      telefone: clientes[i].telefone,
      dataRegistro: clientes[i].dataRegistro,
    });
  }

  return (
    <div>
      <Title>Clientes</Title>

      <Space>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: `linear-gradient(135deg, ${ButtonColor.join(', ')})`,
                colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(ButtonColor).join(', ')})`,
                colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(ButtonColor).join(', ')})`,
                lineWidth: 0,
              },
            },
          }}
        >
          <Button type="primary" size="large" onClick={novoCliente}>
            Novo cliente
          </Button>
        </ConfigProvider>
      </Space>
      <span
        style={{
          marginLeft: 8,
        }}
      >
      </span>
      <Divider />
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <Form
            >
              <div>
                {<GridContatoEditable idClienteContatos={record.key} />}
              </div>

            </Form>
          ),
          rowExpandable: (record) => record.name !== 'Not Expandable',
        }}
        dataSource={data}
      />
      <ModalCliente isOpen={modalOpen} setIsOpenMode={setmodalOpen} dadosCliente={dadosCliente} setDados={setDadoscliente} />

    </div>
  );
}
export default GridCliente;