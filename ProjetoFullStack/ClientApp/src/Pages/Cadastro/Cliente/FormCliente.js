import React, { useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Space, Typography } from 'antd';
import ClienteService from '../../../Service/Clientes/ClienteService';
import ClienteContatoService from '../../../Service/ClienteContatoService';
import { useNavigate } from 'react-router-dom';

const clienteService = new ClienteService();

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
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
    console.log('Received values of form:', values);
};








const FormCliente = () => {
    const [form, setForm] = useState()
    const navigate = useNavigate()

    const handleSubmit = async (event) => {

        event.preventDefault();
        try {
            const response = await clienteService.cadastrar(form)
            navigate('/ListarClientes')           
            if (response === true) {
                
            }
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

            <Title>
                Novo Cliete
            </Title>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{
                    maxWidth: 900,
                }}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name={['user', 'nome']}
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
                    name={['user', 'email']}
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
                    name={['user', 'telefone']}
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
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                    }}
                >
                    <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                        Salvar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default FormCliente;