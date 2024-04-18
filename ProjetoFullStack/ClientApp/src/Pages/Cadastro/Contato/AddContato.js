import React, { Component } from 'react';

export class Contato {
    constructor() {
        this.id = 0;
        this.nome = "";
        this.email = "";
        this.telefone = "";       
    }
}

export class AddContato extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", contato: new Contato(), loading: true };
        this.intialize();

        this.handleSalve = this.handleSalve.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    async intialize() {

        var id = this.props.match.params["id"];
        if (id > 0) {
            const response = await fetch('api/Contatos/' + id);
            const data = await response.json();
            this.setState({ title: "Edit", contato: data, loading: false });
        }
        else {

            this.state = { title: "Create", contato: new Contato(), loading: false };
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>Contato</h3>
                {contents}
            </div>
        );
    }


    async handleSalve(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const { history } = this.props;

        if (this.state.contato.id) {
          await  fetch('api/Contatos/' + this.state.contato.id, { method: 'PUT', body: data });          
            history.push('/fetch-contato');
        }
        else {
            await fetch('api/Contatos/', { method: 'POST', body: data });
            history.push('/fetch-contato');
        }
    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/fetch-contato');
    }

    renderCreateForm() {
        return (
            <form onSubmit={this.handleSalve}>
                <div className="form-group row">
                    <input type="hidden" name="id" value={this.state.contato.id} />
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="text" name="nome" defaultValue={this.state.contato.nome} required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="text" name="email" defaultValue={this.state.contato.email} required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6">
                        <input className="form-control" type="text" name="telefone" defaultValue={this.state.contato.telefone} required />
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-success" value={this.state.contato.id}>Salvar</button>
                    <button className="btn btn-danger" onClick={this.handleCancel}>Cencelar</button>
                </div>
            </form>

        );
    }

}


