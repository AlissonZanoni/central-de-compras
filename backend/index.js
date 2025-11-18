require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

// Conectar ao MongoDB
connectDB();

// Middleware CORS
app.use(cors());

app.use(express.json());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Central de Compras',
      version: '1.0.0',
      description: 'API completa para gerenciar fornecedores, produtos, usuários, lojas, pedidos e campanhas em uma central de compras.',
      contact: {
        name: "Alisson Silva",
        email: "alisson.zanonii@gmail.com"
      }
    },
    servers: [  
      { url: 'http://localhost:3000', description: 'Servidor Local' }
    ],
    components: {
      schemas: {
        Supplier: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            supplier_name: { type: 'string', example: 'Fornecedor XYZ' },
            supplier_category: { type: 'string', example: 'Eletrônicos' },
            contact_email: { type: 'string', example: 'contato@fornecedor.com' },
            phone_number: { type: 'string', example: '(11) 98765-4321' },
            status: { type: 'string', enum: ['on', 'off'], example: 'on' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Product: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439012' },
            name: { type: 'string', example: 'Notebook Dell' },
            description: { type: 'string', example: 'Notebook de alta performance' },
            price: { type: 'number', example: 3500.00 },
            stock_quantity: { type: 'number', example: 15 },
            supplier_id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            status: { type: 'string', enum: ['on', 'off'], example: 'on' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439013' },
            name: { type: 'string', example: 'João Silva' },
            email: { type: 'string', example: 'joao@example.com' },
            username: { type: 'string', example: 'joaosilva' },
            password: { type: 'string', example: 'senha_criptografada' },
            level: { type: 'string', enum: ['admin', 'user'], example: 'user' },
            status: { type: 'string', enum: ['on', 'off'], example: 'on' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Store: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439014' },
            name: { type: 'string', example: 'Loja Centro' },
            cnpj: { type: 'string', example: '12.345.678/0001-90' },
            address: { type: 'string', example: 'Av. Paulista, 1000' },
            phone: { type: 'string', example: '(11) 3456-7890' },
            email: { type: 'string', example: 'loja@example.com' },
            status: { type: 'string', enum: ['on', 'off'], example: 'on' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Order: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439015' },
            name: { type: 'string', example: 'Pedido #001' },
            start_date: { type: 'string', format: 'date-time' },
            end_date: { type: 'string', format: 'date-time' },
            discount: { type: 'number', example: 10.00 },
            store_id: { type: 'string', example: '507f1f77bcf86cd799439014' },
            item: { type: 'string', example: '507f1f77bcf86cd799439012' },
            amount: { type: 'number', example: 5 },
            status: { type: 'string', enum: ['pending', 'processing', 'completed'], example: 'pending' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Campaign: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439016' },
            name: { type: 'string', example: 'Campanha Black Friday' },
            start_date: { type: 'string', format: 'date-time' },
            end_date: { type: 'string', format: 'date-time' },
            discount: { type: 'number', example: 30.00 },
            store_id: { type: 'string', example: '507f1f77bcf86cd799439014' },
            item: { type: 'string', example: '507f1f77bcf86cd799439012' },
            amount: { type: 'number', example: 100 },
            status: { type: 'string', enum: ['active', 'inactive', 'planned'], example: 'active' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Importar as rotas
const supplierRoutes = require('./routes/supplierRoutes');

app.get('/', (req, res) => {
  res.send('API Central de Compras está no ar!');
});

// Usar as rotas de fornecedores com o prefixo /suppliers
app.use('/supplier', supplierRoutes);
app.use('/user', require('./routes/userRoutes'));
app.use('/product', require('./routes/productRoutes'));
app.use('/store', require('./routes/storeRoutes'));
app.use('/campaign', require('./routes/campaignRoutes'));
app.use('/order', require('./routes/orderRoutes'));

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Algo deu errado!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Tratamento de rejeições não capturadas
process.on('unhandledRejection', (err) => {
  console.log('REJEIÇÃO NÃO CAPTURADA! Encerrando...');
  console.log(err.name, err.message);
  process.exit(1);
});

const host = process.env.HOST || '0.0.0.0';
app.listen(port, host, () => {
  console.log(`Servidor rodando em http://${host}:${port}`);
});
