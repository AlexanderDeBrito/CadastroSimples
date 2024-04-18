import React, { Component } from "react"
import { Link } from 'react-router-dom'

export class FetchCliente extends Component {
    static displayName = "Clientes";

    constructor() {
        super();
        this.state = { clientes: [], loading: true }
    }

    componentDidMount() {
        this.populaClienteData();
    }

    static handleEdit(id) {
        window.location.href = "/cliente/edit/" + id;
    }

    static handleDelete(id) {
        if (!window.confirm("Você deseja deletar o cliente : " + id)) {
            return;
        }
        else {
            fetch('api/clientes/' + id, { method: 'delete' })
                .then(json => {
                    window.location.href = "fetch-cliente";
                    alert('Deletado com Sucesso!');
                })
        }
    }

    static renderClientesTabela(clientes) {

        return (
            <table className='table table-striped' aria-labelledby="tabelLabel" >
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente =>
                        <tr key={cliente.id}>
                            <td>{cliente.nome}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefone}</td>

                            <td>
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(cliente.id)}>Editar</button> &nbsp;
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(cliente.id)}>Excluir</button>
                            </td>

                        </tr>

                    )}
                </tbody>
            </table>
        );

    }

    render() {
        let contents = this.state.loading
            ? <p><em> Carregando... </em> </p>
            : FetchCliente.renderClientesTabela(this.state.clientes);

        return (
            <div>
                <h1 id="tabelLabel" >Clientes</h1>
                <p>Tela de Listagem de Clientes</p>
                <p>
                    <Link to="/add-cliente">Cadastrar Cliente</Link>
                </p>
                {contents}
            </div>
        );
    }


    async populaClienteData() {
        const response = await fetch('api/Clientes');
        const data = await response.json();
        this.setState({ clientes: data, loading: false });
    }

}