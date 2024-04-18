import React, { useEffect, useState } from "react"
import { Table, Typography, Button, ConfigProvider, Space } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';
import ContatoService from "../../../Service/Contatos/ContatoService";

const contatosService = new ContatoService();


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
    title: 'email',
    dataIndex: 'age',
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
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};

const GridContato = () => {

  const [contatos, setContatos] = useState([]);

  const [selectionType, setSelectionType] = useState('checkbox');


  const getContatos = async () => {

    try {
      var response = await contatosService.getcontatos();
      setContatos(response);
    } catch (error) {
      console.log(error);
      alert('Algo de errado aconteceu ao Carregar a lista de contatos: '+error);
    }

  }

  useEffect(() => {
    getContatos();
  }, [])


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
          <Button type="primary" size="large">
            Novo contato
          </Button>
        </ConfigProvider>
      </Space>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={contatos}
      />
    </div>
  );

}
export default GridContato;