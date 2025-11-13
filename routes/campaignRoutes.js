// routes/campaignRoutes.js
const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');


/**
 * @swagger
 * components:
 *   schemas:
 *     campaign:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: ID único da campanha 
 *         supplier_id:
 *           type: string
 *           description: ID do fornecedor associado à campanha
 *         name:
 *           type: string
 *           description: Nome da campanha
 *         start_date:
 *           type: string
 *           description: Data de início da campanha
 *         end_date:
 *           type: string
 *           description: Data de término da campanha
 *         discount_percentage:
 *          type: string
 *          description: Porcentagem de desconto da campanha
 *       example:
 *        id: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *        supplier_id: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *        name: "Campanha Exemplo"
 *        start_date: "2024-01-01"
 *        end_date: "2024-01-31"
 *        discount_percentage: "10%"
 *     campaignInput:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         supplier_id:
 *           type: string
 *           description: ID do fornecedor associado à campanha
 *         name:
 *           type: string
 *           description: Nome da campanha
 *         start_date:
 *           type: string
 *           description: Data de início da campanha
 *         end_date:
 *           type: string
 *           description: Data de término da campanha
 *         discount_percentage:
 *          type: string
 *          description: Porcentagem de desconto da campanha
 *       example:
 *        supplier_id: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *        name: "Campanha Exemplo"
 *        start_date: "2024-01-01"
 *        end_date: "2024-01-31"
 *        discount_percentage: "10%"
 */

/**
  * @swagger
  * tags:
  *   name: campaign
  *   description: 
  *     API para gerenciar campanhas em uma central de compras.
  *     **Por Alisson Zanoni**
  */

/**
 * @swagger
 * /campaign:
 *   get:
 *     summary: Listar todos os campanhas 
 *     description: Retorna a lista de todos os campanhas cadastrados na central de compras.
 *     tags: ["campaign"]
 *     responses:
 *       200:
 *         description: A lista de campanhas foi obtida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/campaign'
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
// Rota para listar todos os campanhas (GET)
router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /campaign/{id}:
 *   get:
 *     summary: Listar campanha por ID
 *     description: Retorna uma campanha específico pelo seu ID.
 *     tags: ["campaign"]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *         required: true
 *         description: ID da campanha
 *         example: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *     responses:
 *       200:
 *         description: A Campanha foi obtido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/campaign'
*       404:
 *         description: campanha não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "campanha não encontrado."
 */
// Rota para listar uma campanha por ID
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: "Campanha não encontrada." });
    }
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /campaign/name/{name}:
 *   get:
 *     summary: Listar campanha por nome
 *     description: Retorna uma campanha específico pelo seu nome.
 *     tags: ["campaign"]
 *     parameters:
 *      - in: path
 *        name: name
 *        schema:
 *         type: string
 *         required: true
 *         description: Nome da campanha
 *         example: "Campanha Exemplo"
 *     responses:
 *       200:
 *         description: A Campanha foi obtido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/campaign'
*       404:
 *         description: Campanha não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "Campanha não encontrado."
 */
// Rota para listar uma campanha por nome
router.get('/name/:name', async (req, res) => {
  try {
    const campaign = await Campaign.findOne({ name: req.params.name });
    if (!campaign) {
      return res.status(404).json({ message: "Campanha não encontrada." });
    }
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/**
 * @swagger
 * /campaign:
 *   post:
 *     summary: Cadastrar uma nova campanha
 *     description: Cadastra uma nova campanha na central de compras.
 *     tags: ["campaign"]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/campaignInput'
 *     responses:
 *       200:
 *         description: A Campanha foi cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/campaign'
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
// Rota para cadastrar uma nova campanha
router.post('/', async (req, res) => {
  try {
    const campaign = new Campaign(req.body);
    const newCampaign = await campaign.save();
    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /campaign/{id}:
 *  put:
 *    summary: Atualizar uma campanha
 *    description: Atualiza os dados de uma campanha existente pelo seu ID.
 *    tags: ["campaign"]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID da campanha a ser atualizado
 *        example: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/campaignInput'
 *    responses:
 *      200:
 *        description: A Campanha foi atualizado com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/campaign'
 *      404:
 *        description: Campanha não encontrado para atualização.
 */
// Rota para atualizar uma campanha (UPDATE)
router.put('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!campaign) {
      return res.status(404).json({ message: "Campanha não encontrada para atualização." });
    }
    res.json(campaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


/**
 * @swagger
 * /campaign/{id}:
 *   delete:
 *     summary: Apagar uma campanha
 *     description: Remove uma campanha da central de compras pelo seu ID.
 *     tags: ["campaign"]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da campanha a ser removido
 *         example: "afr0b6d0-a69b-4938-b116-f2e8e0d08542"
 *     responses:
 *       204:
 *        description: A Campanha foi removido com sucesso.
 * 
 *       404:
 *         description: A Campanha foi removido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                  type: string
 *                  example: "Campanha não encontrado para exclusão."
 */
// Rota para apagar uma campanha
router.delete('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: "Campanha não encontrada para exclusão." });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;