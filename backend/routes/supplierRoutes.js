// routes/supplierRoutes.js
const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');

/**
 * @swagger
 * /supplier:
 *   get:
 *     summary: Listar todos os fornecedores
 *     description: Retorna uma lista com todos os fornecedores cadastrados
 *     tags:
 *       - Fornecedores
 *     responses:
 *       200:
 *         description: Lista de fornecedores obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Supplier'
 *       500:
 *         description: Erro ao buscar fornecedores
 */
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /supplier/{id}:
 *   get:
 *     summary: Obter fornecedor por ID
 *     description: Retorna os detalhes de um fornecedor específico
 *     tags:
 *       - Fornecedores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do fornecedor
 *     responses:
 *       200:
 *         description: Fornecedor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 *       404:
 *         description: Fornecedor não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get('/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Fornecedor não encontrado." });
    }
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /supplier/name/{supplier_name}:
 *   get:
 *     summary: Buscar fornecedor por nome
 *     description: Retorna um fornecedor pelo seu nome
 *     tags:
 *       - Fornecedores
 *     parameters:
 *       - in: path
 *         name: supplier_name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do fornecedor
 *     responses:
 *       200:
 *         description: Fornecedor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 *       404:
 *         description: Fornecedor não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get('/name/:supplier_name', async (req, res) => {
  try {
    const supplier = await Supplier.findOne({ supplier_name: req.params.supplier_name });
    if (!supplier) {
      return res.status(404).json({ message: "Fornecedor não encontrado." });
    }
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /supplier:
 *   post:
 *     summary: Criar novo fornecedor
 *     description: Cadastra um novo fornecedor no sistema
 *     tags:
 *       - Fornecedores
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - supplier_name
 *               - supplier_category
 *               - contact_email
 *               - phone_number
 *             properties:
 *               supplier_name:
 *                 type: string
 *                 example: Fornecedor ABC
 *               supplier_category:
 *                 type: string
 *                 example: Eletrônicos
 *               contact_email:
 *                 type: string
 *                 example: contato@fornecedor.com
 *               phone_number:
 *                 type: string
 *                 example: (11) 98765-4321
 *               status:
 *                 type: string
 *                 enum: [on, off]
 *                 example: on
 *     responses:
 *       201:
 *         description: Fornecedor criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 *       400:
 *         description: Dados inválidos
 */
router.post('/', async (req, res) => {
  try {
    const supplier = new Supplier(req.body);
    const newSupplier = await supplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /supplier/{id}:
 *   put:
 *     summary: Atualizar fornecedor
 *     description: Atualiza os dados de um fornecedor existente
 *     tags:
 *       - Fornecedores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do fornecedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplier_name:
 *                 type: string
 *               supplier_category:
 *                 type: string
 *               contact_email:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [on, off]
 *     responses:
 *       200:
 *         description: Fornecedor atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 *       404:
 *         description: Fornecedor não encontrado
 *       400:
 *         description: Dados inválidos
 */
router.put('/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!supplier) {
      return res.status(404).json({ message: "Fornecedor não encontrado para atualização." });
    }
    res.json(supplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /supplier/{id}:
 *   delete:
 *     summary: Deletar fornecedor
 *     description: Remove um fornecedor do sistema
 *     tags:
 *       - Fornecedores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do fornecedor
 *     responses:
 *       204:
 *         description: Fornecedor deletado com sucesso
 *       404:
 *         description: Fornecedor não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete('/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Fornecedor não encontrado para exclusão." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
