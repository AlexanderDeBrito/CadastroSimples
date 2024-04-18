import React, { Component } from "react"
import { Link } from 'react-router-dom'

export class FetchContato extends Component {
    static displayName = "Contatos";

    constructor() {
        super();
        this.state = { contatos: [], loading: true }
    }

    componentDidMount() {
        this.populaContatoData();
    }

    static handleEdit(id) {
        window.location.href = "/contato/edit/" + id;
    }

    static handleDelete(id) {
        if (!window.confirm("Você deseja deletar o contato : " + id)) {
            return;
        }
        else {
            fetch('api/contatos/' + id, { method: 'delete' })
                .then(json => {
                    window.location.href = "fetch-contato";
                    alert('Deletado com Sucesso!');
                })
        }
    }

    static renderContatosTabela(contatos) {

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
                    {contatos.map(contato =>
                        <tr key={contato.id}>
                            <td>{contato.nome}</td>
                            <td>{contato.email}</td>
                            <td>{contato.telefone}</td>

                            <td>
                                <button className="btn btn-success" onClick={(id) => this.handleEdit(contato.id)}>Editar</button> &nbsp;
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(contato.id)}>Excluir</button>
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
            : FetchContato.renderContatosTabela(this.state.contatos);

        return (
            <div>
                <h1 id="tabelLabel" >Contatos</h1>
                <p>Tela de Listagem de Contatos</p>
                <p>
                    <Link to="/add-contato">Cadastrar Contato</Link>
                </p>
                {contents}
            </div>
        );
    }


    async populaContatoData() {
        const response = await fetch('api/Contatos');
        const data = await response.json();
        this.setState({ contatos: data, loading: false });
    }

}