
# Sistema de Cadastro de Clientes e Contatos!

**Descrição do Sistema de Cadastro de Clientes e Contatos**

O Sistema de Cadastro de Clientes e Contatos é uma aplicação web projetada para simplificar a gestão de relacionamento com clientes. Com uma interface intuitiva e funcionalidades robustas, o sistema atende às necessidades de empresas de todos os tamanhos, proporcionando uma maneira eficiente de cadastrar, visualizar, editar e excluir informações de clientes e seus contatos. Aqui estão os principais recursos do sistema:

1. **Cadastro de Cliente:**
   - Uma tela dedicada para o cadastro de clientes, que inclui os seguintes campos obrigatórios:
     - Nome Completo
     - E-mail(s)
     - Telefone(s)
     - Data de Registro (registrando a data em que o cliente foi adicionado ao sistema).
   - Operações CRUD (Criar, Ler, Atualizar e Excluir) para gerenciar os registros de clientes.

2. **Cadastro de Contato:**
   - Uma tela separada para o cadastro de contatos, com os seguintes campos obrigatórios:
     - Nome Completo
     - E-mail(s)
     - Telefone(s)
   - Operações CRUD para manipular os registros de contatos.

3. **Vínculo entre Cliente e Contato:**
   - A possibilidade de associar múltiplos contatos a um único cliente, refletindo a complexidade das relações comerciais.

4. **Relatórios:**
   - Um recurso de geração de relatórios que apresenta uma visão detalhada dos clientes e seus contatos.
   - O relatório pode ser visualizado na própria tela, fornecendo uma análise clara e concisa da estrutura cliente-contato.

5. **Operações Básicas de CRUD:**
   - Tanto a tela de cadastro de cliente quanto a de cadastro de contato oferecem as operações básicas de CRUD para garantir a facilidade de uso e a gestão eficiente dos dados.


## Instalação

Requisitos para rodar a aplicação

```bash
  -npm: '10.5.0'
  -node: '20.12.2'
         *Abrir Terminal no diretorio em {seu diretorio}\CadastroSimples\ProjetoFullStack\ClientApp   
         *rodar 'npm install'

  -Microsoft .NET SDK 5.0.408 ou superior
  -Microsoft SQL Server 2022 ou superior  
```
    
## configuração

```bash
-No arquivo 'appsettings.json' configurar servidor do banco.
   *Substituir a tag <SeuDataSource> pelo nome do seu banco

-No arquivo '.env' na pasta raiz ClientApp, configurar seu host de acordo com a porta que ira rodar a aplicação    

```
