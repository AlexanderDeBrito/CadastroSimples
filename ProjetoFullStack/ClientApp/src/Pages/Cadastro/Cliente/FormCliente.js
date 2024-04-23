import React, { useState } from 'react';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Typography, Space } from 'antd';
import ClienteService from '../../../Service/Clientes/ClienteService';
import { useNavigate } from 'react-router-dom';
import ContatoService from '../../../Service/Contatos/ContatoService';

const clienteService = new ClienteService();
const contatoService = new ContatoService();

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const { Title } = Typography;
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const FormCliente = () => {
    const [form, setForm] = useState()
    const navigate = useNavigate()
    const onFinish = (values) => {
        ClienteSave(values);
    };
    const ClienteSave = async (dados) => {

        try {
            const response = await clienteService.cadastrar(dados.cliente);
            if (dados.contatos != undefined) {
                await contatoService.cadastrarContatoCliente(dados.contatos, response.data.id);
            }
            navigate('/ListarClientes')
        }
        catch (err) {
            alert('Algo deu errado com o Login' + err)
        }
    }
    const handleChange = (event) => {

        setForm({ ...form, [event.target.name]: event.target.value })
    }

    return (
        <div>
            <Title>Cadastrar novo Clientes</Title>
            <Divider />
            <Form
                {...layout}
                onFinish={onFinish}
                style={{
                    maxWidth: 900,
                }}
                validateMessages={validateMessages}
                autoComplete="off"
            >
                <title>Novo Cliente</title>
                <Form.Item
                    name={['cliente', 'nome']}
                    label="Nome"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input onChange={handleChange} name='nome' />
                </Form.Item>
                <Form.Item
                    name={['cliente', 'email']}
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                        },
                    ]}
                >
                    <Input onChange={handleChange} name='email' />
                </Form.Item>
                <Form.Item
                    name={['cliente', 'telefone']}
                    label="Telefone"
                    rules={[
                        {
                            type: 'phone',
                        },
                    ]}
                >
                    <Input onChange={handleChange} name='telefone' />
                </Form.Item>

                <Form.Item

                    label="Contato"

                >
                    <Form.Item>
                        <Form.List name="contatos">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space
                                            key={key}
                                            style={{
                                                display: 'flex',
                                                marginBottom: 8,
                                            }}
                                            align="baseline"
                                        >
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'nomeContato']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing first name',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Nome" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'email']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing last name',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="E-mail" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'telefone']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing last name',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Telefone" />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Adicionar contato
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </Form.Item>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Salvar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default FormCliente;