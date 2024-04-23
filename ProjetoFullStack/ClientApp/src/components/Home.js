import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <header>
          <h1>Bem-vindo ao Sistema de Cadastro de Clientes e Contatos!</h1>
        </header>       
          <h2>Simplifique sua gestão de relacionamento com clientes com nosso sistema intuitivo .</h2>
          <p>Nossa HomePage é o ponto de partida para uma experiência eficiente e organizada de cadastro e manutenção de informações sobre seus clientes e seus contatos. Aqui estão alguns destaques do que você pode esperar ao usar nosso sistema:</p>
          <ul>
            <li>
              <h3>Cadastro de Clientes Simples e Eficiente:</h3>
              <p>Registre novos clientes com facilidade, adicionando detalhes essenciais como nome e informações de contato.</p>
            </li>
            <li>
              <h3>Gerenciamento Centralizado de Contatos:</h3>
              <p>Mantenha uma lista detalhada de todos os contatos associados a cada cliente, incluindo e-mails e números de telefone.</p>
            </li>
            <li>
              <h3>Relatórios:</h3>
              <p>Obtenha insights valiosos sobre o seu relacionamento com os clientes através de relatórios detalhados</p>
            </li>            
          </ul>        
        
      </div>
    );
  }
}
