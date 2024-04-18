import React from 'react';
import ProtectedRoutes from '../Routes/ProtectedRoutes'
import  {Layout}  from '../components/Layout';
import { Home } from '../components/Home';
import Clientes from '../Pages/Grid/Cliente/GridCliente';
import  AddCliente  from '../Pages/Cadastro/Cliente/FormCliente';
import Contatos from '../Pages/Grid/Contato/GridContato';
import { AddContato } from '../components/Contatos/AddContato';
import Cadastro from '../Pages/Login/CadastroUsuario'
import Login from '../Pages/Login/index'
import '../custom.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

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
        <Route path="/cliente/edit/:id" element={
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
        <Route path="/add-contato" element={
          <ProtectedRoutes>
            <Layout>
              <AddContato />
            </Layout>
          </ProtectedRoutes>
        }
        />
        <Route path="/contato/edit/:id" element={
          <ProtectedRoutes>
            <Layout>
              <AddContato />
            </Layout>
          </ProtectedRoutes>
        }
        />
      </Routes>
    </Router >
  );

}
export default Routering;
