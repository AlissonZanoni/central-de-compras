const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Listar todos os pedidos
 *     description: Retorna uma lista com todos os pedidos cadastrados
 *     tags:
 *       - Pedidos
 *     responses:
 *       200:
 *         description: Lista de pedidos obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Erro ao buscar pedidos
 */
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
 *     summary: Obter pedido por ID
 *     description: Retorna os detalhes de um pedido específico
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Pedido não encontrado.' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Criar novo pedido
 *     description: Cadastra um novo pedido no sistema
 *     tags:
 *       - Pedidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - store_id
 *               - item
 *               - amount
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pedido #001
 *               start_date:
 *                 type: string
 *                 format: date-time
 *               end_date:
 *                 type: string
 *                 format: date-time
 *               discount:
 *                 type: number
 *                 example: 10.00
 *               store_id:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439014
 *               item:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439012
 *               amount:
 *                 type: number
 *                 example: 5
 *               status:
 *                 type: string
 *                 enum: [pending, processing, completed]
 *                 example: pending
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Dados inválidos
 */
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
 *   put:
 *     summary: Atualizar pedido
 *     description: Atualiza os dados de um pedido existente
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date-time
 *               end_date:
 *                 type: string
 *                 format: date-time
 *               discount:
 *                 type: number
 *               store_id:
 *                 type: string
 *               item:
 *                 type: string
 *               amount:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [pending, processing, completed]
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Pedido não encontrado
 *       400:
 *         description: Dados inválidos
 */
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!order) return res.status(404).json({ message: 'Pedido não encontrado para atualização.' });
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     summary: Deletar pedido
 *     description: Remove um pedido do sistema
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido
 *     responses:
 *       204:
 *         description: Pedido deletado com sucesso
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Pedido não encontrado para exclusão.' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

module.exports = router;
