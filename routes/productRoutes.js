// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


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
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
router.get('/name/:name', async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.params.name });
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
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
// Rota para atualizar um produto (UPDATE)
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado para atualização." });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado para exclusão." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;