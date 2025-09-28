// routes/supplierRoutes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const supplierFilePath = path.join(__dirname, '../db/supplier.json');


// Função para ler os dados do arquivo
const readSuppliers = () => {
  const data = fs.readFileSync(supplierFilePath, 'utf-8');
  return JSON.parse(data);
};

// Função para escrever os dados no arquivo
const writeSuppliers = (data) => {
  fs.writeFileSync(supplierFilePath, JSON.stringify(data, null, 2));
};


/**
 * @swagger
 * components:
 *   schemas:
 *     supplier:
 *       type: object
 *       required:
 *         - id
 *         - supplier_name
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do Fornecedor
 *         supplier_name:
 *           type: string
 *           description: Nome do Fornecedor
 *         supplier_category:
 *           type: string
 *           description: Categoria do Fornecedor
 *         contact_email:
 *           type: string
 *           description: Email de contato do Fornecedor
 *         phone_number:
 *           type: string
 *           description: Número de telefone do Fornecedor
 *         status:
 *          type: string
 *          description: Status do Fornecedor (ativo/inativo)
 *       example:
 *         id: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *         supplier_name: "Fornecedor Exemplo"
 *         supplier_category: "Eletrônicos"
 *         contact_email: "email@example.com"
 *         phone_number: "+55 11 91234-5678" 
 *         status: "on"
 *     supplierInput:
 *       type: object
 *       required:
 *         - supplier_name
 *       properties:
 *         supplier_name:
 *           type: string
 *           description: Nome do Fornecedor
 *         supplier_category:
 *           type: string
 *           description: Categoria do Fornecedor
 *         contact_email:
 *           type: string
 *           description: Email de contato do Fornecedor
 *         phone_number:
 *           type: string
 *           description: Número de telefone do Fornecedor
 *         status:
 *          type: string
 *          description: Status do Fornecedor (ativo/inativo)
 *       example:
 *         supplier_name: "Fornecedor Exemplo"
 *         supplier_category: "Eletrônicos"
 *         contact_email: "email@example.com"
 *         phone_number: "+55 11 91234-5678" 
 *         status: "on"  
 */

/**
  * @swagger
  * tags:
  *   name: supplier
  *   description: 
  *     API para gerenciar fornecedores em uma central de compras.
  *     **Por Alisson Zanoni**
  */

/**
 * @swagger
 * /supplier:
 *   get:
 *     summary: Listar todos os fornecedores
 *     description: Retorna uma lista de todos os fornecedores cadastrados na central de compras.
 *     tags: ["supplier"]
 *     responses:
 *       200:
 *         description: A lista de fornecedores foi obtida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/supplier'
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
// Rota para listar todos os fornecedores (GET)
router.get('/', (req, res) => {
  const suppliers = readSuppliers();
  res.json(suppliers);
});

/**
 * @swagger
 * /supplier/{id}:
 *   get:
 *     summary: Listar fornecedor por ID
 *     description: Retorna um fornecedor específico pelo seu ID.
 *     tags: ["supplier"]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *         required: true
 *         description: ID do fornecedor
 *         example: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *     responses:
 *       200:
 *         description: O fornecedor foi obtido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/supplier'
*       404:
 *         description: Fornecedor não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "Fornecedor não encontrado."
 */
// Rota para listar um fornecedor por ID
router.get('/:id', (req, res) => {
  const suppliers = readSuppliers();
  const supplier = suppliers.find(s => s.id === req.params.id);
  if (supplier) {
    res.json(supplier);
  } else {
    res.status(404).json({ message: "Fornecedor não encontrado." });
  }
});

/**
 * @swagger
 * /supplier/name/{supplier_name}:
 *   get:
 *     summary: Listar fornecedor por nome
 *     description: Retorna um fornecedor específico pelo seu nome.
 *     tags: ["supplier"]
 *     parameters:
 *      - in: path
 *        name: supplier_name
 *        schema:
 *         type: string
 *         required: true
 *         description: Nome do fornecedor
 *         example: "Fornecedor Exemplo"
 *     responses:
 *       200:
 *         description: O fornecedor foi obtido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/supplier'
*       404:
 *         description: Fornecedor não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "Fornecedor não encontrado."
 */
// Rota para listar um fornecedor por nome
router.get('/name/:supplier_name', (req, res) => {
  const suppliers = readSuppliers();
  const supplier = suppliers.find(s => s.supplier_name === req.params.supplier_name);
  if (supplier) {
    res.json(supplier);
  } else {
    res.status(404).json({ message: "Fornecedor não encontrado." });
  }
});


/**
 * @swagger
 * /supplier:
 *   post:
 *     summary: Cadastrar um novo fornecedor
 *     description: Cadastra um novo fornecedor na central de compras.
 *     tags: ["supplier"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/supplierInput'
 *     responses:
 *       200:
 *         description: O fornecedor foi cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/supplier'
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
// Rota para cadastrar um novo fornecedor
router.post('/', (req, res) => {
  const suppliers = readSuppliers();
  const newSupplier = {
    id: uuidv4(),
    ...req.body
  };
  suppliers.push(newSupplier);
  writeSuppliers(suppliers);
  res.status(201).json(newSupplier);
});

/**
 * @swagger
 * /supplier/{id}:
 *  put:
 *    summary: Atualizar um fornecedor
 *    description: Atualiza os dados de um fornecedor existente pelo seu ID.
 *    tags: ["supplier"]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID do fornecedor a ser atualizado
 *        example: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/supplierInput'
 *    responses:
 *      200:
 *        description: O fornecedor foi atualizado com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/supplier'
 *      404:
 *        description: Fornecedor não encontrado para atualização.
 */
// Rota para atualizar um fornecedor (UPDATE) [cite: 38]
router.put('/:id', (req, res) => {
  let suppliers = readSuppliers();
  const index = suppliers.findIndex(s => s.id === req.params.id);
  if (index !== -1) {
    suppliers[index] = { ...suppliers[index], ...req.body };
    writeSuppliers(suppliers);
    res.json(suppliers[index]);
  } else {
    res.status(404).json({ message: "Fornecedor não encontrado para atualização." });
  }
});


/**
 * @swagger
 * /supplier/{id}:
 *   delete:
 *     summary: Apagar um fornecedor
 *     description: Remove um fornecedor da central de compras pelo seu ID.
 *     tags: ["supplier"]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do fornecedor a ser removido
 *         example: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *     responses:
 *       204:
 *        description: O fornecedor foi removido com sucesso.
 * 
 *       404:
 *         description: O fornecedor foi removido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "Fornecedor não encontrado para exclusão."
 */
// Rota para apagar um fornecedor
router.delete('/:id', (req, res) => {
  let suppliers = readSuppliers();
  const filteredSuppliers = suppliers.filter(s => s.id !== req.params.id);
  if (suppliers.length > filteredSuppliers.length) {
    writeSuppliers(filteredSuppliers);
    res.status(204).send(); // 204 No Content
  } else {
    res.status(404).json({ message: "Fornecedor não encontrado para exclusão." });
  }
});

module.exports = router;