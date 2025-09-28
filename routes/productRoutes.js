// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const productFilePath = path.join(__dirname, '../db/product.json');


// Função para ler os dados do arquivo
const readProduct = () => {
  const data = fs.readFileSync(productFilePath, 'utf-8');
  return JSON.parse(data);
};

// Função para escrever os dados no arquivo
const writeProduct = (data) => {
  fs.writeFileSync(productFilePath, JSON.stringify(data, null, 2));
};


/**
 * @swagger
 * components:
 *   schemas:
 *     product:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do produto 
 *         name:
 *           type: string
 *           description: Nome do produto
 *         description:
 *           type: string
 *           description: Descrição do produto
 *         price:
 *           type: string
 *           description: Preço do produto
 *         stock_quantity:
 *           type: string
 *           description: Quantidade em estoque do produto
 *         supplier_id:
 *          type: string
 *          description: ID do fornecedor do produto
 *         status:
 *          type: string
 *          description: Status do produto (ativo/inativo)
 *       example:
 *        id: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *        name: "Produto Exemplo"
 *        description: "Descrição do produto exemplo"
 *        price: "100.00"
 *        stock_quantity: "50"
 *        supplier_id: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *        status: "on"
 *     productInput:
 *       type: object
 *       required:
 *         name:
 *           type: string
 *           description: Nome do produto
 *         description:
 *           type: string
 *           description: Descrição do produto
 *         price:
 *           type: string
 *           description: Preço do produto
 *         stock_quantity:
 *           type: string
 *           description: Quantidade em estoque do produto
 *         supplier_id:
 *          type: string
 *          description: ID do fornecedor do produto
 *         status:
 *          type: string
 *          description: Status do produto (ativo/inativo)
 *       example:
 *        name: "Produto Exemplo"
 *        description: "Descrição do produto exemplo"
 *        price: "100.00"
 *        stock_quantity: "50"
 *        supplier_id: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *        status: "on"
 */

/**
  * @swagger
  * tags:
  *   name: product
  *   description: 
  *     API para gerenciar produtos em uma central de compras.
  *     **Por Alisson Zanoni**
  */

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Listar todos os produtos 
 *     description: Retorna a lista de todos os produtos cadastrados na central de compras.
 *     tags: ["product"]
 *     responses:
 *       200:
 *         description: A lista de produtos foi obtida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/product'
 *       400:
 *         description: Erro na requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "Erro na requisição."
 */
// Rota para listar todos os produtos (GET)
router.get('/', (req, res) => {
  const product = readProduct();
  res.json(product);
});

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Listar produto por ID
 *     description: Retorna um produto específico pelo seu ID.
 *     tags: ["product"]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *         required: true
 *         description: ID do produto
 *         example: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *     responses:
 *       200:
 *         description: O produto foi obtido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/product'
*       404:
 *         description: produto não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "produto não encontrado."
 */
// Rota para listar um produto por ID
router.get('/:id', (req, res) => {
  const products = readProduct();
  const product = products.find(s => s.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Produto não encontrado." });
  }
});

/**
 * @swagger
 * /product/name/{name}:
 *   get:
 *     summary: Listar produto por nome
 *     description: Retorna um produto específico pelo seu nome.
 *     tags: ["product"]
 *     parameters:
 *      - in: path
 *        name: name
 *        schema:
 *         type: string
 *         required: true
 *         description: Nome do produto
 *         example: "Produto Exemplo"
 *     responses:
 *       200:
 *         description: O produto foi obtido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/product'
*       404:
 *         description: Produto não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "Produto não encontrado."
 */
// Rota para listar um produto por nome
router.get('/name/:name', (req, res) => {
  const products = readProduct();
  const product = products.find(s => s.name === req.params.name);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Produto não encontrado." });
  }
});


/**
 * @swagger
 * /product:
 *   post:
 *     summary: Cadastrar um novo produto
 *     description: Cadastra um novo produto na central de compras.
 *     tags: ["product"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/productInput'
 *     responses:
 *       200:
 *         description: O produto foi cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/product'
 *       400:
 *         description: Erro na requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "Erro na requisição."
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "Erro interno do servidor."
 */
// Rota para cadastrar um novo produto
router.post('/', (req, res) => {
  const product = readProduct();
  const newSupplier = {
    id: uuidv4(),
    ...req.body
  };
  product.push(newSupplier);
  writeProduct(product);
  res.status(201).json(newSupplier);
});

/**
 * @swagger
 * /product/{id}:
 *  put:
 *    summary: Atualizar um produto
 *    description: Atualiza os dados de um produto existente pelo seu ID.
 *    tags: ["product"]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID do produto a ser atualizado
 *        example: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/productInput'
 *    responses:
 *      200:
 *        description: O produto foi atualizado com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/product'
 *      404:
 *        description: Produto não encontrado para atualização.
 */
// Rota para atualizar um produto (UPDATE) [cite: 38]
router.put('/:id', (req, res) => {
  let product = readProduct();
  const index = product.findIndex(s => s.id === req.params.id);
  if (index !== -1) {
    product[index] = { ...product[index], ...req.body };
    writeProduct(product);
    res.json(product[index]);
  } else {
    res.status(404).json({ message: "Produto não encontrado para atualização." });
  }
});


/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Apagar um produto
 *     description: Remove um produto da central de compras pelo seu ID.
 *     tags: ["product"]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto a ser removido
 *         example: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *     responses:
 *       204:
 *        description: O produto foi removido com sucesso.
 * 
 *       404:
 *         description: O produto foi removido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "Produto não encontrado para exclusão."
 */
// Rota para apagar um produto
router.delete('/:id', (req, res) => {
  let product = readProduct();
  const filteredSuppliers = product.filter(s => s.id !== req.params.id);
  if (product.length > filteredSuppliers.length) {
    writeProduct(filteredSuppliers);
    res.status(204).send(); // 204 No Content
  } else {
    res.status(404).json({ message: "Produto não encontrado para exclusão." });
  }
});

module.exports = router;