// routes/storeRoutes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storeFilePath = path.join(__dirname, '../db/store.json');


// Função para ler os dados do arquivo
const readLoja = () => {
  const data = fs.readFileSync(storeFilePath, 'utf-8');
  return JSON.parse(data);
};

// Função para escrever os dados no arquivo
const writeLoja = (data) => {
  fs.writeFileSync(storeFilePath, JSON.stringify(data, null, 2));
};


/**
 * @swagger
 * components:
 *   schemas:
 *     store:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: ID único da loja 
 *         store_name:
 *           type: string
 *           description: Nome da loja
 *         cnpj:
 *           type: string
 *           description: CNPJ da loja
 *         address:
 *           type: string
 *           description: Endereço da loja
 *         phone_number:
 *           type: string
 *           description: Número de telefone da loja
 *         contact_email:
 *          type: string
 *          description: Email de contato da loja
 *         status:
 *          type: string
 *          description: Status da loja (ativo/inativo)
 *       example:
 *        id: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *        name: "Loja Exemplo"
 *        cnpj: "12.345.678/0001-90"
 *        address: "Rua Exemplo, 123, Cidade, Estado"
 *        phone_number: "(11) 1234-5678"
 *        contact_email: "store@example.com"
 *        status: "on"
 *     storeInput:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         store_name:
 *           type: string
 *           description: Nome da loja
 *         cnpj:
 *           type: string
 *           description: CNPJ da loja
 *         address:
 *           type: string
 *           description: Endereço da loja
 *         phone_number:
 *           type: string
 *           description: Número de telefone da loja
 *         contact_email:
 *          type: string
 *          description: Email de contato da loja
 *         status:
 *          type: string
 *          description: Status da loja (ativo/inativo)
 *       example:
 *        name: "Loja Exemplo"
 *        cnpj: "12.345.678/0001-90"
 *        address: "Rua Exemplo, 123, Cidade, Estado"
 *        phone_number: "(11) 1234-5678"
 *        contact_email: "store@example.com"
 *        status: "on"
 */

/**
  * @swagger
  * tags:
  *   name: store
  *   description: 
  *     API para gerenciar lojas em uma central de compras.
  *     **Por Alisson Zanoni**
  */

/**
 * @swagger
 * /store:
 *   get:
 *     summary: Listar todos os lojas 
 *     description: Retorna a lista de todos os lojas cadastrados na central de compras.
 *     tags: ["store"]
 *     responses:
 *       200:
 *         description: A lista de lojas foi obtida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/store'
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
// Rota para listar todos os lojas (GET)
router.get('/', (req, res) => {
  const store = readLoja();
  res.json(store);
});

/**
 * @swagger
 * /store/{id}:
 *   get:
 *     summary: Listar loja por ID
 *     description: Retorna uma loja específico pelo seu ID.
 *     tags: ["store"]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *         required: true
 *         description: ID da loja
 *         example: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *     responses:
 *       200:
 *         description: A loja foi obtido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/store'
*       404:
 *         description: loja não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "loja não encontrado."
 */
// Rota para listar uma loja por ID
router.get('/:id', (req, res) => {
  const stores = readLoja();
  const store = stores.find(s => s.id === req.params.id);
  if (store) {
    res.json(store);
  } else {
    res.status(404).json({ message: "Loja não encontrado." });
  }
});

/**
 * @swagger
 * /store/name/{name}:
 *   get:
 *     summary: Listar loja por nome
 *     description: Retorna uma loja específico pelo seu nome.
 *     tags: ["store"]
 *     parameters:
 *      - in: path
 *        name: name
 *        schema:
 *         type: string
 *         required: true
 *         description: Nome da loja
 *         example: "Loja Exemplo"
 *     responses:
 *       200:
 *         description: A loja foi obtido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/store'
*       404:
 *         description: Loja não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "Loja não encontrado."
 */
// Rota para listar uma loja por nome
router.get('/name/:name', (req, res) => {
  const stores = readLoja();
  const store = stores.find(s => s.store_name === req.params.store_name);
  if (store) {
    res.json(store);
  } else {
    res.status(404).json({ message: "Loja não encontrado." });
  }
});


/**
 * @swagger
 * /store:
 *   post:
 *     summary: Cadastrar uma nova loja
 *     description: Cadastra uma nova loja na central de compras.
 *     tags: ["store"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/storeInput'
 *     responses:
 *       200:
 *         description: A loja foi cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/store'
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
// Rota para cadastrar uma nova loja
router.post('/', (req, res) => {
  const store = readLoja();
  const newSupplier = {
    id: uuidv4(),
    ...req.body
  };
  store.push(newSupplier);
  writeLoja(store);
  res.status(201).json(newSupplier);
});

/**
 * @swagger
 * /store/{id}:
 *  put:
 *    summary: Atualizar uma loja
 *    description: Atualiza os dados de uma loja existente pelo seu ID.
 *    tags: ["store"]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID da loja a ser atualizado
 *        example: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/storeInput'
 *    responses:
 *      200:
 *        description: A loja foi atualizado com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/store'
 *      404:
 *        description: Loja não encontrado para atualização.
 */
// Rota para atualizar uma loja (UPDATE) [cite: 38]
router.put('/:id', (req, res) => {
  let store = readLoja();
  const index = store.findIndex(s => s.id === req.params.id);
  if (index !== -1) {
    store[index] = { ...store[index], ...req.body };
    writeLoja(store);
    res.json(store[index]);
  } else {
    res.status(404).json({ message: "Loja não encontrado para atualização." });
  }
});


/**
 * @swagger
 * /store/{id}:
 *   delete:
 *     summary: Apagar uma loja
 *     description: Remove uma loja da central de compras pelo seu ID.
 *     tags: ["store"]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da loja a ser removido
 *         example: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *     responses:
 *       204:
 *        description: A loja foi removido com sucesso.
 * 
 *       404:
 *         description: A loja foi removido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "Loja não encontrado para exclusão."
 */
// Rota para apagar uma loja
router.delete('/:id', (req, res) => {
  let store = readLoja();
  const filteredSuppliers = store.filter(s => s.id !== req.params.id);
  if (store.length > filteredSuppliers.length) {
    writeLoja(filteredSuppliers);
    res.status(204).send(); // 204 No Content
  } else {
    res.status(404).json({ message: "Loja não encontrado para exclusão." });
  }
});

module.exports = router;