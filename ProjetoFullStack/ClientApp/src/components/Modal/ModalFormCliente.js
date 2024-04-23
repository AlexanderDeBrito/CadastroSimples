import React, { useState } from 'react';
import { Modal } from 'antd';
import { Form, Input, } from 'antd';
import ClienteService from '../../Service/Clientes/ClienteService';
import { Label } from 'reactstrap';

const clienteService = new ClienteService();
const layout = {
    labelCol: {
        span: 14,
    },
    wrapperCol: {
        span: 22,
    },
};

const ModalFormCliente = ({ isOpen, setIsOpenMode, dadosCliente, setDados }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const handleOk = async () => {
        setConfirmLoading(true);
        try {
            const data = ({
                id: dadosCliente.key,
                nome: dadosCliente.nome,
                Telefone: dadosCliente.telefone,
                email: dadosCliente.email,
                dataRegistro: dadosCliente.dataRegistro
            })
            const response = await clienteService.Atualizar(data)

            if (response === true) {
                setTimeout(() => {
                    setIsOpenMode(false);
                    setConfirmLoading(false);
                }, 2000);
                window.location.reload();
            }

        }
        catch (err) {
            alert('Algo deu errado ao Atualizar o Cliente' + err)
        }

    };
    const handleCancel = () => {
        setIsOpenMode(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setDados({ ...dadosCliente, [name]: value })
    }

    return (
        <>
            <Modal
                title="Editar Cliente"
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
                            <Input name='nome' value={dadosCliente.nome} onChange={handleChange} />
                        </div>
                        <div>
                            <Label htmlFor='title'>E-mail</Label>
                            <Input name='email' value={dadosCliente.email} onChange={handleChange} />
                        </div>
                        <div>
                            <Label title='title'>Telefone</Label>
                            <Input name='telefone' value={dadosCliente.telefone} onChange={handleChange} />
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
export default ModalFormCliente;