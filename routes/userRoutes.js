// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const userFilePath = path.join(__dirname, '../db/user.json');


// Função para ler os dados do arquivo
const readUser = () => {
  const data = fs.readFileSync(userFilePath, 'utf-8');
  return JSON.parse(data);
};

// Função para escrever os dados no arquivo
const writeUser = (data) => {
  fs.writeFileSync(userFilePath, JSON.stringify(data, null, 2));
};


/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do usuario 
 *         name:
 *           type: string
 *           description: Nome do usuario
 *         contact_email:
 *           type: string
 *           description: Email de contato do usuario
 *         user:
 *           type: string
 *           description: Usuario do sistema
 *         pwd:
 *           type: string
 *           description: Senha do usuario
 *         level:
 *          type: string
 *          description: Nível de acesso do usuario (admin/user)
 *         status:
 *          type: string
 *          description: Status do usuario (ativo/inativo)
 *       example:
 *        id: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *        name: "Usuario Exemplo"
 *        contact_email: "user@example.com"
 *        user: "usuario.exemplo"
 *        pwd: "senhaexemplo"
 *        level: "admin"
 *        status: "on"  
 *     userInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do usuario
 *         contact_email:
 *           type: string
 *           description: Email de contato do usuario
 *         user:
 *           type: string
 *           description: Usuario do sistema
 *         pwd:
 *           type: string
 *           description: Senha do usuario
 *         level:
 *          type: string
 *          description: Nível de acesso do usuario (admin/user)
 *         status:
 *          type: string
 *          description: Status do usuario (ativo/inativo)
 *       example:
 *        name: "Usuario Exemplo"
 *        contact_email: "usuario@example.com"
 *        user: "usuarioexemplo"
 *        pwd: "senhaexemplo"
 *        level: "admin"
 *        status: "on"  
 */

/**
  * @swagger
  * tags:
  *   name: user
  *   description: 
  *     API para gerenciar usuarios em uma central de compras.
  *     **Por Alisson Zanoni**
  */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Listar todos os usuarios 
 *     description: Retorna a lista de todos os usuarios cadastrados na central de compras.
 *     tags: ["user"]
 *     responses:
 *       200:
 *         description: A lista de usuarios foi obtida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
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
// Rota para listar todos os usuarios (GET)
router.get('/', (req, res) => {
  const users = readUser();
  res.json(users);
});

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Listar usuario por ID
 *     description: Retorna um usuario específico pelo seu ID.
 *     tags: ["user"]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *         required: true
 *         description: ID do usuario
 *         example: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *     responses:
 *       200:
 *         description: O usuario foi obtido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/user'
*       404:
 *         description: usuario não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "usuario não encontrado."
 */
// Rota para listar um usuario por ID
router.get('/:id', (req, res) => {
  const users = readUser();
  const user = users.find(s => s.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Usuario não encontrado." });
  }
});

/**
 * @swagger
 * /user/name/{name}:
 *   get:
 *     summary: Listar usuario por nome
 *     description: Retorna um usuario específico pelo seu nome.
 *     tags: ["user"]
 *     parameters:
 *      - in: path
 *        name: name
 *        schema:
 *         type: string
 *         required: true
 *         description: Nome do usuario
 *         example: "Usuario Exemplo"
 *     responses:
 *       200:
 *         description: O usuario foi obtido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/user'
*       404:
 *         description: Usuario não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "Usuario não encontrado."
 */
// Rota para listar um usuario por nome
router.get('/name/:name', (req, res) => {
  const users = readUser();
  const user = users.find(s => s.name === req.params.name);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Usuario não encontrado." });
  }
});


/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cadastrar um novo usuario
 *     description: Cadastra um novo usuario na central de compras.
 *     tags: ["user"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userInput'
 *     responses:
 *       200:
 *         description: O usuario foi cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
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
// Rota para cadastrar um novo usuario
router.post('/', (req, res) => {
  const users = readUser();
  const newSupplier = {
    id: uuidv4(),
    ...req.body
  };
  users.push(newSupplier);
  writeUser(users);
  res.status(201).json(newSupplier);
});

/**
 * @swagger
 * /user/{id}:
 *  put:
 *    summary: Atualizar um usuario
 *    description: Atualiza os dados de um usuario existente pelo seu ID.
 *    tags: ["user"]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID do usuario a ser atualizado
 *        example: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/userInput'
 *    responses:
 *      200:
 *        description: O usuario foi atualizado com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *      404:
 *        description: Usuario não encontrado para atualização.
 */
// Rota para atualizar um usuario (UPDATE) [cite: 38]
router.put('/:id', (req, res) => {
  let users = readUser();
  const index = users.findIndex(s => s.id === req.params.id);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    writeUser(users);
    res.json(users[index]);
  } else {
    res.status(404).json({ message: "Usuario não encontrado para atualização." });
  }
});


/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Apagar um usuario
 *     description: Remove um usuario da central de compras pelo seu ID.
 *     tags: ["user"]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuario a ser removido
 *         example: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *     responses:
 *       204:
 *        description: O usuario foi removido com sucesso.
 * 
 *       404:
 *         description: O usuario foi removido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "Usuario não encontrado para exclusão."
 */
// Rota para apagar um usuario
router.delete('/:id', (req, res) => {
  let users = readUser();
  const filteredSuppliers = users.filter(s => s.id !== req.params.id);
  if (users.length > filteredSuppliers.length) {
    writeUser(filteredSuppliers);
    res.status(204).send(); // 204 No Content
  } else {
    res.status(404).json({ message: "Usuario não encontrado para exclusão." });
  }
});

module.exports = router;