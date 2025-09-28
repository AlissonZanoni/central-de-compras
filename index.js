const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc'); 

const express = require('express');
const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});