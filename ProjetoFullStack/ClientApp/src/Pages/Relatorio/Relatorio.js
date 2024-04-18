import React, { useState } from "react"
import { Table, Typography } from 'antd';
import RelatorioService from "../../../Service/Relatorios/RelatorioService";

const relatoriosService = new RelatorioService();


const { Title } = Typography;


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'age',
  },
  {
    title: 'Telefone',
    dataIndex: 'address',
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

const componentDidMount = async () => {
  await relatoriosService.getrelatorios();
}


const GridRelatorio = () => {

  const relatorios = [];

  const [selectionType, setSelectionType] = useState('checkbox');
  const [checkStrictly, setCheckStrictly] = useState(false);



  componentDidMount();




  return (
    <div>

      <Title>Relatorios</Title>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
          checkStrictly
        }}
        columns={columns}
        dataSource={relatorios}
      />
    </div>
  );

}
export default GridRelatorio;