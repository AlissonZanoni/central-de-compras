# 🛒 Central de Compras - API de Usuários

Este projeto é uma API REST desenvolvida em **Node.js** com **Express**, que gerencia usuários de uma central de compras.  
Os dados dos usuários são armazenados em um arquivo JSON e podem ser acessados, cadastrados, atualizados e removidos por meio das rotas disponíveis.  

A documentação da API está disponível via **Swagger** no seguinte endereço:

👉 [http://localhost:3000/api-docs/#/](http://localhost:3000/api-docs/#/)

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Swagger](https://swagger.io/) (para documentação interativa)
- [UUID](https://www.npmjs.com/package/uuid) (geração de IDs únicos)
- [fs](https://nodejs.org/api/fs.html) (manipulação de arquivos)

---

## 📂 Estrutura do Projeto

📦 projeto-central-compras
┣ 📂 db
┃ ┗ 📜 user.json # Banco de dados em JSON
┣ 📂 routes
┃ ┗ 📜 userRoutes.js # Rotas da API
┣ 📜 index.js # Configuração principal da aplicação
┣ 📜 package.json
┗ 📜 README.md

---

## ⚙️ Instalação

1. Clone este repositório:

git clone https://github.com/seu-usuario/projeto-central-compras.git
cd projeto-central-compras

2. Instale as dependências:
npm install

npm run dev
