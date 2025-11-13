// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');


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
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Ordem não encontrado." });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
router.get('/name/:name', async (req, res) => {
  try {
    const order = await Order.findOne({ name: req.params.name });
    if (!order) {
      return res.status(404).json({ message: "Ordem não encontrado." });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
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
// Rota para atualizar uma ordem (UPDATE)
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Ordem não encontrado para atualização." });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Ordem não encontrado para exclusão." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;