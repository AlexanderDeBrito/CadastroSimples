import React, { Component } from 'react';

export class Cliente {
    constructor() {
        this.id = 0;
        this.nome = "";
        this.email = "";
        this.telefone = "";
        this.dataRegistro = "";
    }
}

export class AddCliente extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", cliente: new Cliente(), loading: true };
        this.intialize();

        this.handleSalve = this.handleSalve.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    async intialize() {

        var id = this.props.match.params["id"];
        if (id > 0) {
            const response = await fetch('api/Clientes/' + id);
            const data = await response.json();
            this.setState({ title: "Edit", cliente: data, loading: false });
        }
        else {

            this.state = { title: "Create", cliente: new Cliente(), loading: false };
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>Cliente</h3>
                {contents}
            </div>
        );
    }


    async handleSalve(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const { history } = this.props;

        if (this.state.cliente.id) {
          await  fetch('api/Clientes/' + this.state.cliente.id, { method: 'PUT', body: data });          
            history.push('/fetch-cliente');
        }
        else {
            await fetch('api/Clientes/', { method: 'POST', body: data });
            history.push('/fetch-cliente');
        }
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/fetch-cliente');
    }

    renderCreateForm() {
        return (
            <form onSubmit={this.handleSalve}>
                <div className="form-group row">
                    <input type="hidden" name="id" value={this.state.cliente.id} />
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="text" name="nome" defaultValue={this.state.cliente.nome} required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="text" name="email" defaultValue={this.state.cliente.email} required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="text" name="telefone" defaultValue={this.state.cliente.telefone} required />
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-success" value={this.state.cliente.id}>Salvar</button>
                    <button className="btn btn-danger" onClick={this.handleCancel}>Cencelar</button>
                </div>
            </form>

        );
    }

}


