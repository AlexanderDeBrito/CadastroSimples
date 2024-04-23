import React from 'react';
import ProtectedRoutes from '../Routes/ProtectedRoutes'
import { Layout } from '../components/Layout';
import { Home } from '../components/Home';
import Clientes from '../Pages/Grid/Cliente/GridCliente';
import AddCliente from '../Pages/Cadastro/Cliente/FormCliente';
import Contatos from '../Pages/Grid/Contato/GridContato';
import AddContato from '../Pages/Cadastro/Contato/FormContato';
import Cadastro from '../Pages/Login/CadastroUsuario'
import Login from '../Pages/Login/index'
import Relatorio from '../Pages/Relatorio/Relatorio';
import '../custom.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FormGridContato from '../Pages/Cadastro/Contato/FormGridContato';

const Routering = () => {
  return (
    <Router>
      <Routes>

        <Route path="" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastro />} />
        <Route path="/Home" element={
          <ProtectedRoutes>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoutes>
        }
        />
        <Route path="/ListarClientes" element={
          <ProtectedRoutes>
            <Layout>
              <Clientes />
            </Layout>
          </ProtectedRoutes>
        }
        />
        <Route path="/CadastrarCliente" element={
          <ProtectedRoutes>
            <Layout>
              <AddCliente />
            </Layout>
          </ProtectedRoutes>
        }
        />
        <Route path="/Listarcontatos" element={
          <ProtectedRoutes>
            <Layout>
              <Contatos />
            </Layout>
          </ProtectedRoutes>
        }
        />
        <Route path="/CadastrarContato" element={
          <ProtectedRoutes>
            <Layout>
              <AddContato />
            </Layout>
          </ProtectedRoutes>
        }
        />
        <Route path="/ListarRelatorio" element={
          <ProtectedRoutes>
            <Layout>
              <Relatorio />
            </Layout>
          </ProtectedRoutes>
        }
        />
        <Route path="/Vincularcontato/:id" element={
          <ProtectedRoutes>
            <Layout>
              <FormGridContato />
            </Layout>
          </ProtectedRoutes>
        }
        />
      </Routes>
    </Router >
  );

}
export default Routering;
