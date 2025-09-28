// routes/storeRoutes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const orderFilePath = path.join(__dirname, '../db/order.json');


// Função para ler os dados do arquivo
const readOrdem = () => {
  const data = fs.readFileSync(orderFilePath, 'utf-8');
  return JSON.parse(data);
};

// Função para escrever os dados no arquivo
const writeOrdem = (data) => {
  fs.writeFileSync(orderFilePath, JSON.stringify(data, null, 2));
};


/**
 * @swagger
 * components:
 *   schemas:
 *     order:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: ID único da ordem 
 *         store_id:
 *           type: string
 *           description: ID do fornecedor associado à ordem
 *         item:
 *           type: string
 *           description: item da ordem
 *         total_amount:
 *           type: string
 *           description: Valor total da ordem
 *         status:
 *           type: string
 *           description: Status da ordem
 *         date:
 *          type: string
 *          description: Data da ordem
 *       example:
 *        id: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *        store_id: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *        item: "Item Exemplo"
 *        total_amount: "1500.00"
 *        status: "Pendente"
 *        date: "2024-01-15"
 *     campaignInput:
*       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         store_id:
 *           type: string
 *           description: ID do fornecedor associado à ordem
 *         item:
 *           type: string
 *           description: item da ordem
 *         total_amount:
 *           type: string
 *           description: Valor total da ordem
 *         status:
 *           type: string
 *           description: Status da ordem
 *         date:
 *          type: string
 *          description: Data da ordem
 *       example:
 *        store_id: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *        item: "Item Exemplo"
 *        total_amount: "1500.00"
 *        status: "Pendente"
 *        date: "2024-01-15"
 */

/**
  * @swagger
  * tags:
  *   name: order
  *   description: 
  *     API para gerenciar ordem em uma central de compras.
  *     **Por Alisson Zanoni**
  */

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Listar todos as ordem 
 *     description: Retorna a lista de todos as ordem cadastrados na central de compras.
 *     tags: ["order"]
 *     responses:
 *       200:
 *         description: A lista de ordem foi obtida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/order'
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
// Rota para listar todos as ordem (GET)
router.get('/', (req, res) => {
  const order = readOrdem();
  res.json(order);
});

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Listar ordem por ID
 *     description: Retorna uma ordem específico pelo seu ID.
 *     tags: ["order"]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *         required: true
 *         description: ID da ordem
 *         example: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *     responses:
 *       200:
 *         description: A Ordem foi obtido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/order'
*       404:
 *         description: ordem não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "ordem não encontrado."
 */
// Rota para listar uma ordem por ID
router.get('/:id', (req, res) => {
  const orders = readOrdem();
  const order = orders.find(s => s.id === req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: "Ordem não encontrado." });
  }
});

/**
 * @swagger
 * /order/name/{name}:
 *   get:
 *     summary: Listar ordem por nome
 *     description: Retorna uma ordem específico pelo seu nome.
 *     tags: ["order"]
 *     parameters:
 *      - in: path
 *        name: name
 *        schema:
 *         type: string
 *         required: true
 *         description: Nome da ordem
 *         example: "Ordem Exemplo"
 *     responses:
 *       200:
 *         description: A Ordem foi obtido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/order'
*       404:
 *         description: Ordem não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "Ordem não encontrado."
 */
// Rota para listar uma ordem por nome
router.get('/name/:name', (req, res) => {
  const orders = readOrdem();
  const order = orders.find(s => s.name === req.params.name);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: "Ordem não encontrado." });
  }
});


/**
 * @swagger
 * /order:
 *   post:
 *     summary: Cadastrar uma nova ordem
 *     description: Cadastra uma nova ordem na central de compras.
 *     tags: ["order"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/campaignInput'
 *     responses:
 *       200:
 *         description: A Ordem foi cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/order'
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
// Rota para cadastrar uma nova ordem
router.post('/', (req, res) => {
  const order = readOrdem();
  const newSupplier = {
    id: uuidv4(),
    ...req.body
  };
  order.push(newSupplier);
  writeOrdem(order);
  res.status(201).json(newSupplier);
});

/**
 * @swagger
 * /order/{id}:
 *  put:
 *    summary: Atualizar uma ordem
 *    description: Atualiza os dados de uma ordem existente pelo seu ID.
 *    tags: ["order"]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID da ordem a ser atualizado
 *        example: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/campaignInput'
 *    responses:
 *      200:
 *        description: A Ordem foi atualizado com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/order'
 *      404:
 *        description: Ordem não encontrado para atualização.
 */
// Rota para atualizar uma ordem (UPDATE) [cite: 38]
router.put('/:id', (req, res) => {
  let order = readOrdem();
  const index = order.findIndex(s => s.id === req.params.id);
  if (index !== -1) {
    order[index] = { ...order[index], ...req.body };
    writeOrdem(order);
    res.json(order[index]);
  } else {
    res.status(404).json({ message: "Ordem não encontrado para atualização." });
  }
});


/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     summary: Apagar uma ordem
 *     description: Remove uma ordem da central de compras pelo seu ID.
 *     tags: ["order"]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da ordem a ser removido
 *         example: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *     responses:
 *       204:
 *        description: A Ordem foi removido com sucesso.
 * 
 *       404:
 *         description: A Ordem foi removido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "Ordem não encontrado para exclusão."
 */
// Rota para apagar uma ordem
router.delete('/:id', (req, res) => {
  let order = readOrdem();
  const filteredSuppliers = order.filter(s => s.id !== req.params.id);
  if (order.length > filteredSuppliers.length) {
    writeOrdem(filteredSuppliers);
    res.status(204).send(); // 204 No Content
  } else {
    res.status(404).json({ message: "Ordem não encontrado para exclusão." });
  }
});

module.exports = router;