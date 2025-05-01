const express = require('express');
const Product = require('../models/Product');
const upload = require('../config/multerConfig'); // Import Multer config

const router = express.Router();

// Create product with image upload
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category, stock, rentalDuration } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required.' });
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      rentalDuration,
      image: `/uploads/${req.file.filename}` // Save the uploaded image path
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
