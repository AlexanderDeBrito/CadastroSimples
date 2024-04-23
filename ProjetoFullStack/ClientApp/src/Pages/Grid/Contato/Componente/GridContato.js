import React, { useEffect, useState } from "react"
import { Table, Divider } from 'antd';
import ContatoService from "../../../../Service/Contatos/ContatoService";

const contatosService = new ContatoService();
const GridContato = (idClienteContatos) => {
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
    ];

    return (
        <>
            <h5>Contatos:</h5>
            <Divider />
            <Table
                showHeader={true}
                columns={columns}
                dataSource={contatos}
                bordered
            />
        </>


    );
}
export default GridContato;