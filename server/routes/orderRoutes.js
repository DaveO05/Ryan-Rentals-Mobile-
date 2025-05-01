const express = require('express');
const Order = require('../models/order'); // Import Order model
const router = express.Router();

// Create an order
router.post('/', async (req, res) => {
  const { customerName, email, phone, products, totalPrice, deliveryAddress } = req.body;

  try {
    const newOrder = new Order({
      customerName,
      email,
      phone,
      products,
      totalPrice,
      deliveryAddress,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder); // Send the created order as a response
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).send("Server error while creating order");
  }
});

module.exports = router;
