const express = require('express');

const HomeController = require('./controllers/HomeController');
const TaskController = require('./controllers/TaskController');
const CategoryController = require('./controllers/CategoryController');

const routes = express.Router();

routes.get('/tasks', TaskController.index);
routes.get('/tasks/:category_id', TaskController.listByCategory);
routes.post('/tasks', TaskController.store);

routes.get('/categories', CategoryController.index);
routes.post('/categories', CategoryController.store);
routes.get('/categories/:category_id', CategoryController.find);

routes.get('/home', HomeController.index);

module.exports = routes;