const Category = require('../models/Category');
const Task = require('../models/Task');

module.exports = {
  async index(req, res) {
    const tasks = await Task.find();

    return res.json(tasks);
  },

  async listByCategory(req, res) {
    const { category_id } = req.params;

    const tasks = await Task.find({ category: category_id });

    return res.json(tasks);
  },

  async store(req, res) {
    const { description, status, category_id } = req.body;

    const start_date = Date();
    const ending_date = Date();

    const category = await Category.findById(category_id);

    if (!category)
      return res.status(400).json({ error: "Categoria não existe!"});

    const task = await Task.create({
      description,
      status,
      start_date,
      ending_date,
      category: category,
    });

    return res.json(task);
  }
};