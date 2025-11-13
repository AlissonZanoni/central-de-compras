require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

// Conectar ao MongoDB
connectDB();

app.use(express.json());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Central de Compras',
      version: '1.0.0',
      description: 'API para gerenciar fornecedores em uma central de compras.',
    },
    contact : {
      name: "Alisson Silva",
      email: "alisson.zanonii@gmail.com"
    },
    servers: [  
      { url: 'http://localhost:3000', description: 'Servidor Local' }
    ],
  },
  apis: ['./routes/*.js'], // Caminho para os arquivos de rotas
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

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});