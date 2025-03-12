Sistema de Gerenciamento de Alunos e Disciplinas (Frontend)
Este projeto é o frontend de um sistema de gerenciamento de alunos e disciplinas, desenvolvido com React. Ele permite a interação do usuário com o sistema, incluindo cadastro, edição, exclusão e consulta de alunos e disciplinas, além de permitir que alunos se matriculem em disciplinas específicas.

Funcionalidades
Páginas e Componentes
Página de Login:

Autenticação de alunos e administradores.

Redirecionamento para a página inicial após o login.

Cadastro de Alunos:

Interface para cadastrar e gerenciar alunos (apenas para administradores).

Validação de campos obrigatórios e máscaras para telefone, data de nascimento, matrícula e CEP.

Cadastro de Disciplinas:

Interface para cadastrar e gerenciar disciplinas (apenas para administradores).

Matrículas:

Interface para matricular alunos em disciplinas.

Minhas Disciplinas:

Página onde o aluno logado pode visualizar as disciplinas nas quais está matriculado.

Header:

Componente reutilizável que exibe o cabeçalho do aplicativo com links de navegação e botão de logout.

Tecnologias Utilizadas
React: Biblioteca JavaScript para construção de interfaces.

React Router: Para gerenciamento de rotas no frontend.

Axios: Para fazer requisições HTTP à API backend.

React Bootstrap: Para componentes de UI responsivos.

React Icons: Para ícones na interface.

CSS: Para estilização personalizada.

Estrutura do Projeto
Diretórios e Arquivos
src/: Contém todos os componentes e páginas do frontend.

components/: Componentes reutilizáveis, como o Header.

Header.jsx: Componente que exibe o cabeçalho com links de navegação.

pages/: Páginas do sistema.

Home.jsx: Página inicial.

Alunos.jsx: Página de cadastro e gerenciamento de alunos.

Disciplinas.jsx: Página de cadastro e gerenciamento de disciplinas.

Matricula.jsx: Página para matricular alunos em disciplinas.

MinhasDisciplinas.jsx: Página para visualizar disciplinas matriculadas.

Login.jsx: Página de login.

services/: Contém o arquivo api.js para configuração do Axios.

styles/: Contém arquivos CSS para estilização.

Como Executar o Frontend
Instale as dependências:

bash
Copy
cd frontend
npm install
Inicie o servidor de desenvolvimento:

bash
Copy
npm run dev
Acesse o sistema:

O frontend estará disponível em http://localhost:5000.

Detalhes dos Componentes
App.jsx
Descrição: Arquivo principal do React que configura as rotas do aplicativo usando React Router.

Rotas:

/: Página inicial.

/alunos: Página de gerenciamento de alunos.

/disciplinas: Página de gerenciamento de disciplinas.

/minhas-disciplinas: Página para visualizar disciplinas matriculadas.

/matriculas: Página para matricular alunos em disciplinas.

/login: Página de login.

Alunos.jsx
Descrição: Componente responsável pelo gerenciamento de alunos, incluindo cadastro, edição, exclusão e listagem de alunos.

Funcionalidades:

Validação de campos obrigatórios e máscaras para telefone, data de nascimento, matrícula e CEP.

Integração com a API backend para operações CRUD.

Modo de edição para atualizar informações de alunos existentes.

Listagem de alunos apenas para administradores.

Header.jsx
Descrição: Componente reutilizável que exibe o cabeçalho do aplicativo com links de navegação e botão de logout.

Observações
A lista de alunos está na página “Cadastrar Aluno”, entretanto, só pode ser acessada pelo:

Usuário: admin@admin.com

Senha: admin