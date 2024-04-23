import React, { useState, useEffect } from 'react';
import { Button, Divider, Form, Input, Typography } from 'antd';
import ContatoService from '../../../Service/Contatos/ContatoService';
import { useNavigate } from 'react-router-dom';


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
    required: '${label} é obrigatório!',
    types: {
        email: '${label} não é um email válido!',
        number: '${label} não é um numero válido!',
    },

};


  

const FormContato = () => {

    const [form, setForm] = useState()

    const navigate = useNavigate()

    const handleSubmit = async (event) => {

        event.preventDefault();
        try {
            const response = await contatoService.cadastrar(form)            
            navigate('/ListarContatos')
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
            <Title>Cadastrar novo Contatos</Title>
            <Divider />
            <Form
                {...layout}
                style={{
                    maxWidth: 900,
                }}
                validateMessages={validateMessages}
            ><title>Novo Contato</title>
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
export default FormContato;