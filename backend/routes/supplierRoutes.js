// routes/supplierRoutes.js
const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');

// Rota para listar todos os fornecedores (GET)
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para listar um fornecedor por ID
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

// Rota para listar um fornecedor por nome
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

// Rota para cadastrar um novo fornecedor
router.post('/', async (req, res) => {
  try {
    const supplier = new Supplier(req.body);
    const newSupplier = await supplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota para atualizar um fornecedor (UPDATE)
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

// Rota para apagar um fornecedor
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
