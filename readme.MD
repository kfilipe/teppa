Saudações, caro leitor! Aqui tentarei listar o passo a passo do projeto para consultas futuras.

Neste projeto criarei usarei o MERN (Mongo, Express, React e Nodejs).

Estarei utilizando vscode e o postman para gerenciar as collection do banco de dados

IMPORTANTE

- INSTALAR O NODEJS E MONGODB na máquina

** Configurando o Projeto **

----------------BACKEND---------------

1º - Criei o arquivo server.js
2º - Instalei as dependências do projeto (Seguem abaixo):
    npm install ...
        I: cookie-parser -->  Analisador de cookie
        II: cors --> Pelo que entendi (atualmente) o cors é um mecanismo que verifica a permissao para acessar um recurso
        III: express -->é um framework para usar o node (confesso que já aprendi node com express e nao sei a diferença de nao usa-lo)
        IV: path --> Utilitário para manipulação e transformação de caminho de arquivo
        V: nodemon --> Somente para desenvolvimento e fica atualizando as alterações sem precisar reiniciar o servidor
            Obs: adicionar no package.json --> "dev": "nodemon server.js"

3º - Importar as dependêcias e configurar o servidor
4º - Estruturação de pastas.


-------------FRONTEND-----------------

1º - Instalar o projeto react (npx create-react-app client) na raiz do projeto
2º - Instalar o react router dom (v6)
3º - Instalar o MUI MATERIAL (framework usado para o front)
4º - Estruturação das pastas.