import React, { useState } from 'react';
import { Modal } from 'antd';
import { Form, Input, } from 'antd';
import ContatoService from '../../Service/Contatos/ContatoService';
import { Label } from 'reactstrap';
import { useNavigate } from 'react-router-dom'



const contatoService = new ContatoService();

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const ModalFormContato = ({ isOpen, setIsOpenMode, dadosContato, setDados, idCliente }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);

    const navigate = useNavigate()

    const handleOk = async () => {

        setConfirmLoading(true);
        try {
            if (dadosContato.id > 0) {
                const response = await contatoService.Atualizar(dadosContato)
                setTimeout(() => {
                    setIsOpenMode(false);
                    setConfirmLoading(false);
                }, 2000);
                window.location.reload();
            } else {

                const data = ({
                    ClienteId: idCliente.id,
                    id:dadosContato.id,
                    nome: dadosContato.nome,
                    Telefone: dadosContato.telefone,
                    email: dadosContato.email,
                  })
                const response = await contatoService.cadastrar(data)
                setTimeout(() => {
                    setIsOpenMode(false);
                    setConfirmLoading(false);
                }, 2000);
                navigate('/ListarClientes')
            }
            


        }
        catch (err) {
            alert('Algo deu errado ao Atualizar o Contato' + err)
        }

    };
    const handleCancel = () => {
        setIsOpenMode(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setDados({ ...dadosContato, [name]: value })
    }


    return (
        <>
            <Modal
                title="Editar Contato"
                open={isOpen}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <div>
                    <Form
                        {...layout}
                        name="nest-messages"
                        style={{
                            maxWidth: 900,
                        }}
                    >
                        <div>
                            <Label htmlFor='title'>Nome</Label>
                            <Input name='nome' value={dadosContato.nome} onChange={handleChange} />
                        </div>
                        <div>
                            <Label htmlFor='title'>E-mail</Label>
                            <Input name='email' value={dadosContato.email} onChange={handleChange} />
                        </div>
                        <div>
                            <Label title='title'>Telefone</Label>
                            <Input name='telefone' value={dadosContato.telefone} onChange={handleChange} />
                        </div>
                        <Form.Item
                            wrapperCol={{
                                ...layout.wrapperCol,
                                offset: 8,
                            }}
                        >
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
};
export default ModalFormContato;