const express = require('express');
const router = express.Router();
const Store = require('../models/Store');

/**
 * @swagger
 * /store:
 *   get:
 *     summary: Listar todas as lojas
 *     description: Retorna uma lista com todas as lojas cadastradas
 *     tags:
 *       - Lojas
 *     responses:
 *       200:
 *         description: Lista de lojas obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Store'
 *       500:
 *         description: Erro ao buscar lojas
 */
router.get('/', async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /store/{id}:
 *   get:
 *     summary: Obter loja por ID
 *     description: Retorna os detalhes de uma loja específica
 *     tags:
 *       - Lojas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da loja
 *     responses:
 *       200:
 *         description: Loja encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 *       404:
 *         description: Loja não encontrada
 *       500:
 *         description: Erro no servidor
 */
router.get('/:id', async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) return res.status(404).json({ message: 'Loja não encontrada.' });
    res.json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /store:
 *   post:
 *     summary: Criar nova loja
 *     description: Cadastra uma nova loja no sistema
 *     tags:
 *       - Lojas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - cnpj
 *               - address
 *               - phone
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: Loja Centro
 *               cnpj:
 *                 type: string
 *                 example: 12.345.678/0001-90
 *               address:
 *                 type: string
 *                 example: Av. Paulista, 1000
 *               phone:
 *                 type: string
 *                 example: (11) 3456-7890
 *               email:
 *                 type: string
 *                 example: loja@example.com
 *               status:
 *                 type: string
 *                 enum: [on, off]
 *                 example: on
 *     responses:
 *       201:
 *         description: Loja criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 *       400:
 *         description: Dados inválidos
 */
router.post('/', async (req, res) => {
  try {
    const store = new Store(req.body);
    const newStore = await store.save();
    res.status(201).json(newStore);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /store/{id}:
 *   put:
 *     summary: Atualizar loja
 *     description: Atualiza os dados de uma loja existente
 *     tags:
 *       - Lojas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da loja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               cnpj:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [on, off]
 *     responses:
 *       200:
 *         description: Loja atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 *       404:
 *         description: Loja não encontrada
 *       400:
 *         description: Dados inválidos
 */
router.put('/:id', async (req, res) => {
  try {
    const store = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!store) return res.status(404).json({ message: 'Loja não encontrada para atualização.' });
    res.json(store);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /store/{id}:
 *   delete:
 *     summary: Deletar loja
 *     description: Remove uma loja do sistema
 *     tags:
 *       - Lojas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da loja
 *     responses:
 *       204:
 *         description: Loja deletada com sucesso
 *       404:
 *         description: Loja não encontrada
 *       500:
 *         description: Erro no servidor
 */
router.delete('/:id', async (req, res) => {
  try {
    const store = await Store.findByIdAndDelete(req.params.id);
    if (!store) return res.status(404).json({ message: 'Loja não encontrada para exclusão.' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

module.exports = router;
