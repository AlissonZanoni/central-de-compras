# 🛒 Central de Compras - Plataforma Completa

Sistema completo de gerenciamento de compras desenvolvido em **Node.js + Express** no backend e **React** no frontend, com **MongoDB** como banco de dados.

A aplicação permite gerenciar fornecedores, produtos, usuários, lojas, pedidos e campanhas através de uma interface intuitiva com documentação automática via **Swagger**.

---

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **Swagger** - Documentação interativa da API
- **dotenv** - Gerenciamento de variáveis de ambiente
- **CORS** - Suporte a requisições cross-origin

### Frontend
- **React** - Biblioteca de UI
- **React Router** - Roteamento entre páginas
- **Axios** - Cliente HTTP
- **React Toastify** - Notificações elegantes
- **CSS Modular** - Estilos componentizados

---

## 📂 Estrutura do Projeto

```
central-de-compras/
├── backend/                      # API Node.js + Express
│   ├── models/                   # Schemas Mongoose
│   │   ├── Supplier.js
│   │   ├── Product.js
│   │   ├── User.js
│   │   ├── Store.js
│   │   ├── Order.js
│   │   └── Campaign.js
│   ├── routes/                   # Rotas da API
│   │   ├── supplierRoutes.js
│   │   ├── productRoutes.js
│   │   ├── userRoutes.js
│   │   ├── storeRoutes.js
│   │   ├── orderRoutes.js
│   │   └── campaignRoutes.js
│   ├── config/
│   │   └── db.js                 # Conexão MongoDB
│   ├── index.js                  # Entry point
│   ├── .env                      # Variáveis de ambiente
│   └── package.json
│
└── frontend/                     # Aplicação React
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/           # Componentes reutilizáveis
    │   │   ├── Modal.js
    │   │   └── Navbar.js
    │   ├── pages/                # Páginas do CRUD
    │   │   ├── Home.js
    │   │   ├── Suppliers.js
    │   │   ├── Products.js
    │   │   ├── Users.js
    │   │   ├── Stores.js
    │   │   ├── Orders.js
    │   │   └── Campaigns.js
    │   ├── services/
    │   │   └── api.js            # Cliente HTTP Axios
    │   ├── App.js
    │   └── index.js
    └── package.json
```

---

## ⚙️ Instalação

### Pré-requisitos
- Node.js (v14+)
- MongoDB (local ou atlas)
- npm ou yarn

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/central-de-compras.git
cd central-de-compras
```

### 2. Instalar dependências do backend
```bash
cd backend
npm install
```

### 3. Instalar dependências do frontend
```bash
cd ../frontend
npm install
```

### 4. Configurar variáveis de ambiente (Backend)
Crie um arquivo `.env` na pasta `backend/`:
```env
MONGODB_URI=mongodb://localhost:27017/central-de-compras
PORT=3000
NODE_ENV=development
HOST=0.0.0.0
```

---

## 🏃 Como Executar

### Terminal 1 - Backend (porta 3000)
```bash
cd backend
npm run dev
```
- API rodando em: `http://localhost:3000`
- Swagger docs: `http://localhost:3000/api-docs`

### Terminal 2 - Frontend (porta 3001)
```bash
cd frontend
npm start
```
- Aplicação rodando em: `http://localhost:3001`

---

## 📝 Funcionalidades

### 📦 Fornecedores
- ✅ Listar todos os fornecedores
- ✅ Criar novo fornecedor
- ✅ Editar fornecedor (com máscara de telefone)
- ✅ Deletar fornecedor
- ✅ Status com dropdown (Ativo/Inativo)

### 📦 Produtos
- ✅ Listar todos os produtos
- ✅ Criar produto (com seleção de fornecedor via dropdown)
- ✅ Editar produto
- ✅ Deletar produto
- ✅ Exibição do nome do fornecedor na tabela

### 👥 Usuários
- ✅ Listar todos os usuários
- ✅ Criar usuário
- ✅ Editar usuário
- ✅ Deletar usuário
- ✅ Nível com dropdown (Admin/Usuário)
- ✅ Status com dropdown (Ativo/Inativo)

### 🏢 Lojas
- ✅ Listar todas as lojas
- ✅ Criar loja
- ✅ Editar loja
- ✅ Deletar loja
- ✅ Status com dropdown (Ativo/Inativo)

### 📋 Pedidos
- ✅ Listar todos os pedidos
- ✅ Criar pedido (com seleção de loja e produto via dropdown)
- ✅ Editar pedido
- ✅ Deletar pedido
- ✅ Produtos carregados dinamicamente
- ✅ Status com dropdown (Pendente/Processando/Concluído)

### 📢 Campanhas
- ✅ Listar todas as campanhas
- ✅ Criar campanha (com seleção de loja e produto via dropdown)
- ✅ Editar campanha
- ✅ Deletar campanha
- ✅ Status com dropdown (Ativa/Inativa/Planejada)

---

## 🔌 API Endpoints

### Fornecedores
```
GET    /supplier              # Listar todos
POST   /supplier              # Criar novo
GET    /supplier/:id          # Obter por ID
PUT    /supplier/:id          # Atualizar
DELETE /supplier/:id          # Deletar
```

### Produtos
```
GET    /product               # Listar todos
POST   /product               # Criar novo
GET    /product/:id           # Obter por ID
PUT    /product/:id           # Atualizar
DELETE /product/:id           # Deletar
```

### Usuários
```
GET    /user                  # Listar todos
POST   /user                  # Criar novo
GET    /user/:id              # Obter por ID
PUT    /user/:id              # Atualizar
DELETE /user/:id              # Deletar
```

### Lojas
```
GET    /store                 # Listar todos
POST   /store                 # Criar novo
GET    /store/:id             # Obter por ID
PUT    /store/:id             # Atualizar
DELETE /store/:id             # Deletar
```

### Pedidos
```
GET    /order                 # Listar todos
POST   /order                 # Criar novo
GET    /order/:id             # Obter por ID
PUT    /order/:id             # Atualizar
DELETE /order/:id             # Deletar
```

### Campanhas
```
GET    /campaign              # Listar todos
POST   /campaign              # Criar novo
GET    /campaign/:id          # Obter por ID
PUT    /campaign/:id          # Atualizar
DELETE /campaign/:id          # Deletar
```

---

## 📚 Documentação da API

Acesse a documentação interativa **Swagger** em:
```
http://localhost:3000/api-docs
```

---

## 🎯 Recursos Principais

- **CRUD Completo** para todas as entidades
- **Dropdowns inteligentes** para seleção de relacionamentos
- **Máscara de telefone** automática nos campos
- **Validações** de dados no frontend e backend
- **Notificações Toast** para feedback do usuário
- **Tratamento de erros** robusto
- **Responsivo** para diferentes tamanhos de tela

---

## 🔒 Segurança

- CORS habilitado para requisições do frontend
- Variáveis sensíveis em `.env`
- Validação de dados com Mongoose
- Tratamento de exceções em todas as rotas

---

## 📧 Contato & Autor

**Alisson Silva**
- Email: alisson.zanonii@gmail.com
- GitHub: [AlissonZanoni](https://github.com/AlissonZanoni)

---

## 📄 Licença

Este projeto está sob a licença ISC.
