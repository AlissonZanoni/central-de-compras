const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');

/**
 * @swagger
 * /campaign:
 *   get:
 *     summary: Listar todas as campanhas
 *     description: Retorna uma lista com todas as campanhas cadastradas
 *     tags:
 *       - Campanhas
 *     responses:
 *       200:
 *         description: Lista de campanhas obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Campaign'
 *       500:
 *         description: Erro ao buscar campanhas
 */
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
 *     summary: Obter campanha por ID
 *     description: Retorna os detalhes de uma campanha específica
 *     tags:
 *       - Campanhas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da campanha
 *     responses:
 *       200:
 *         description: Campanha encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campaign'
 *       404:
 *         description: Campanha não encontrada
 *       500:
 *         description: Erro no servidor
 */
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campanha não encontrada.' });
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /campaign:
 *   post:
 *     summary: Criar nova campanha
 *     description: Cadastra uma nova campanha no sistema
 *     tags:
 *       - Campanhas
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
 *                 example: Campanha Black Friday
 *               start_date:
 *                 type: string
 *                 format: date-time
 *               end_date:
 *                 type: string
 *                 format: date-time
 *               discount:
 *                 type: number
 *                 example: 30.00
 *               store_id:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439014
 *               item:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439012
 *               amount:
 *                 type: number
 *                 example: 100
 *               status:
 *                 type: string
 *                 enum: [active, inactive, planned]
 *                 example: active
 *     responses:
 *       201:
 *         description: Campanha criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campaign'
 *       400:
 *         description: Dados inválidos
 */
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
 *   put:
 *     summary: Atualizar campanha
 *     description: Atualiza os dados de uma campanha existente
 *     tags:
 *       - Campanhas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da campanha
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
 *                 enum: [active, inactive, planned]
 *     responses:
 *       200:
 *         description: Campanha atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campaign'
 *       404:
 *         description: Campanha não encontrada
 *       400:
 *         description: Dados inválidos
 */
router.put('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!campaign) return res.status(404).json({ message: 'Campanha não encontrada para atualização.' });
    res.json(campaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /campaign/{id}:
 *   delete:
 *     summary: Deletar campanha
 *     description: Remove uma campanha do sistema
 *     tags:
 *       - Campanhas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da campanha
 *     responses:
 *       204:
 *         description: Campanha deletada com sucesso
 *       404:
 *         description: Campanha não encontrada
 *       500:
 *         description: Erro no servidor
 */
router.delete('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campanha não encontrada para exclusão.' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

module.exports = router;
