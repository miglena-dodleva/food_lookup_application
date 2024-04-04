const Food = require("./food-model");
const { readData, writeData } = require("./database-helper/helper");

// get all foods
exports.getAllFoods = (request, response) => {
  let data = readData();
  response.json(data.foods);
};

// get food by id
exports.getFoodById = (request, response) => {
  let data = readData();
  let id = parseInt(request.params.id);
  let food = data.foods.find((x) => x.id === id);

  if (food) {
    response.json(food);
  } else {
    response.status(404).send(`Food with ID: ${id} is missing`);
  }
};

// search foods by name
exports.searchFoodsByName = (request, response) => {
  let data = readData();
  let query = request.query.name.toLowerCase();

  let foodFilter = data.foods.filter((food) =>
    food.name.toLowerCase().includes(query)
  );

  response.json(foodFilter);
};

// create food
exports.createFood = (request, response) => {
  let data = readData();
  let { name, calories, protein, carbs, fats } = request.body;

  let createfood = new Food(
    data.foods.length + 1,
    name,
    calories,
    protein,
    carbs,
    fats
  );

  data.foods.push(createfood);
  writeData(data);
  response.status(201).json(createfood);
};

// update food
exports.updateFood = (request, response) => {
  let data = readData();
  let { id, name, calories, protein, carbs, fats } = request.body;

  let foodIndex = data.foods.findIndex((x) => x.id === parseInt(id));

  if (foodIndex > -1) {
    data.foods[foodIndex] = new Food(id, name, calories, protein, carbs, fats);

    writeData(data);
    response.json(data.foods[foodIndex]);
  } else {
    response.status(404).send(`Food with ID: ${foodIndex} not found`);
  }
};

// delete food
exports.deleteFood = (request, response) => {
  let data = readData();
  let id = parseInt(request.params.id);
  let foodIndex = data.foods.findIndex((x) => x.id === id);

  if (foodIndex > -1) {
    data.foods.splice(foodIndex, 1);
    writeData(data);
    response.status(200).send(`Food with ID: ${foodIndex} deleted`);
  } else {
    response.status(404).send(`Food with ID: ${foodIndex} not found`);
  }
};
