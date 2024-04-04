const express = require('express');
const router = express.Router();

const foodController = require('./food-controller');

// CRUD functionality
router.get('/foods', foodController.getAllFoods);
router.get('/foods/:id', foodController.getFoodById);
router.get('/foods/search', foodController.searchFoodsByName);
router.post('/foods', foodController.createFood);
router.put('/foods', foodController.updateFood);
router.delete('/foods/:id', foodController.deleteFood);

module.exports = router;
