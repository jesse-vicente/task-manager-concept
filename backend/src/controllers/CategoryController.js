const Category = require('../models/Category');
const Task = require('../models/Task');

module.exports = {
  async index(req, res) {
    const categories = await Category.find().where('description').ne('Todas');

    if (categories)
      return res.json(categories);

    return res.json({ message: 'Any records found!' });
  },

  async find(req, res) {
    const { category_id } = req.params;

    const category = await Category.findById(category_id);

    return res.json(category);
  },

  async store(req, res) {
    const { description, icon, icon_color } = req.body;

    const category = await Category.create({
      description,
      icon,
      icon_color,
    });

    return res.json(category);
  }
};