import React, { useEffect, useState } from "react"
import { Form, Table } from 'antd';
import ClienteService from '../../Service/Clientes/ClienteService';
import GridContato from '../../Pages/Grid/Contato/Componente/GridContato'

const clientesService = new ClienteService();
const columns = [
  {
    title: 'Nome',
    dataIndex: 'nome',
    key: 'id',
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'id',
  },
  {
    title: 'Telefone',
    dataIndex: 'telefone',
    key: 'id',
  },
];

const Relatorio = () => {
  const [clientes, setClientes] = useState([]);
  const data = [];
  for (let i = 0; i < clientes.length; i++) {
    data.push({
      key: clientes[i].id,
      nome: clientes[i].nome,
      email: clientes[i].email,
      telefone: clientes[i].telefone,
    });
  }

  const getClientes = async () => {
    try {
      var response = await clientesService.getclientes();

      setClientes(response);
    } catch (error) {
      console.log(error);
      alert('Algo deu errado ao Carregar a lista de Clientes: ' + error)
    }
  }

  useEffect(() => {
    getClientes();
  }, [])

  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <Form
            style={{
              gridAutoRows: "auto-rows-auto"
            }}
          >
            <div>
              {<GridContato idClienteContatos={record.key} />}
            </div>

          </Form>
        ),
        rowExpandable: (record) => record.name !== 'Not Expandable',
      }}
      dataSource={data}
    />
  )
};
export default Relatorio;