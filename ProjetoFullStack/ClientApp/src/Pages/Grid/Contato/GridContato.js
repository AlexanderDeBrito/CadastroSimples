import React, { useEffect, useState } from "react"
import { Table, Typography, Button, ConfigProvider, Space, Divider, Link } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';
import ContatoService from "../../../Service/Contatos/ContatoService";
import { useNavigate } from 'react-router-dom'
import ModalContato from "../../../components/Modal/ModalFormContato";

const contatosService = new ContatoService();

const initialValue = { id: 0, nome: 'teste', email: '', telefone: '', dataRegistro: '' }


const { Title } = Typography;
const ButtonColor = ['#6253E1', '#04BEFE'];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());


const GridContato = () => {
  const [contatos, setContatos] = useState([]);
  const [dadosContato, setDadoscontato] = useState(initialValue);
  const [modalOpen, setmodalOpen] = useState(false);

  const getContatos = async () => {
    try {
      var response = await contatosService.getcontatos();
      setContatos(response);
    } catch (error) {
      console.log(error);
      alert('Algo deu errado ao Carregar a lista de Contatos: ' + error)
    }
  }

  const navigate = useNavigate()
  const novoContato = async () => {
    navigate('/CadastrarContato')
  }

  const handleDados = async (dados) => {
    setmodalOpen(true);
    setDadoscontato(dados);
  }

  const handleDelete = async (dados) => {

    var response = await contatosService.Deletar(dados.id);
    window.location.reload();

  }

  useEffect(() => {
    getContatos();
  }, []);

  const columns = [
    {
      dataIndex: "id",
    },
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

  return (
    <div>
      <Title>Contatos</Title>

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
          <Button type="primary" size="large" onClick={novoContato}>
            Novo contato
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
        dataSource={contatos}
      />
      <ModalContato isOpen={modalOpen} setIsOpenMode={setmodalOpen} dadosContato={dadosContato} setDados={setDadoscontato} />
    </div>
  );

}
export default GridContato;