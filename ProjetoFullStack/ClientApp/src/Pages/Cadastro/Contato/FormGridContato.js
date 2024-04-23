import React, { useEffect, useState } from "react"
import { Table, Typography, Button, ConfigProvider, Space, Divider, Link } from 'antd';
import { useParams } from "react-router-dom";
import ContatoService from "../../../Service/Contatos/ContatoService";
import { useNavigate } from 'react-router-dom'
import ModalFormContato from "../../../components/Modal/ModalFormContato";


const contatosService = new ContatoService();

const { Title } = Typography;

const initialValue =
  { id: 0, nome: '', email: '', telefone: '', dataRegistro: '' }

const FormGridContato = () => {

    const [contatos, setContatos] = useState([]);
    const [dadosContato, setDadoscontato] = useState(initialValue);
    const [modalOpen, setmodalOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const parametros = useParams();


    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const start = async () => {
        setLoading(true);
        var response = await contatosService.vincularContato(parametros.id, selectedRowKeys);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        navigate('/ListarClientes')
    };


    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };


    const getContatos = async () => {
        try {
            var response = await contatosService.getcontatosSemVinculo();
            setContatos(response);
        } catch (error) {
            console.log(error);
            alert('Algo deu errado ao Carregar a lista de Contatos: ' + error)
        }
    }

    const navigate = useNavigate()
    const novoContato = async () => {
        setmodalOpen(true);
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
    ];

    const data = [];
    for (let i = 0; i < contatos.length; i++) {
        data.push({
            key: contatos[i].id,
            nome: contatos[i].nome,
            email: contatos[i].email,
            telefone: contatos[i].telefone,
        });
    }

    const hasSelected = selectedRowKeys.length > 0;

    return (
        <div>
            <Title>Contatos</Title>

            <div
                style={{
                    marginBottom: 16,
                }}
            >
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    Vincular
                </Button>
                <Button type="primary" onClick={novoContato} disabled={hasSelected} loading={loading}>
                    Criar Contato
                </Button>
            </div>
            <Divider />
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
            />
            <ModalFormContato isOpen={modalOpen} setIsOpenMode={setmodalOpen} dadosContato={dadosContato} setDados={setDadoscontato} idCliente={parametros}/>

        </div>
    );

}
export default FormGridContato;