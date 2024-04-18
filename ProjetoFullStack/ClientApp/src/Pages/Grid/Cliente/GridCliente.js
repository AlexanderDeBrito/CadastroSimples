import React, { useEffect, useState } from "react"
import { Table, Typography, Button, ConfigProvider, Space } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';
import ClienteService from "../../../Service/Clientes/ClienteService";
import { useNavigate } from 'react-router-dom'

const clientesService = new ClienteService();


const { Title } = Typography;
const ButtonColor = ['#6253E1', '#04BEFE'];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const columns = [
  {
    title: 'Name',
    dataIndex: 'nome',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Telefone',
    dataIndex: 'telefone',
  },
];



const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};


const GridCliente = () => {

  const [selectionType, setSelectionType] = useState('checkbox');




  const [clientes, setClientes] = useState([]);

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
  const novoCliente = async (event) => {
    navigate('/CadastrarCliente')
  }


  useEffect(() => {
    getClientes();
  }, [])


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
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={clientes}
      />
    </div>
  );

}
export default GridCliente;