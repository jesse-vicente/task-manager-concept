const Category = require('../models/Category');
const Task = require('../models/Task');

module.exports = {
  async index(req, res) {
    const totalTasks = await Task.countDocuments({});

    Category.aggregate([
    {
      $lookup:
        {
          from: 'tasks',
          localField: "_id",
          foreignField: "category",
          as: 'tasks',
        }
      },
      {
        $project:
        {
          _id: 1,
          description: 1,
          icon: 1,
          icon_color: 1,
          tasks: { $size: "$tasks" }
        }
      }
    ]).exec(function(err, result) {
        if (err)
          return res.json({ message: 'Ocorreu um erro durante a listagem, tente mais tarde.'});

        return res.json({
          categories: result,
          totalTasks: totalTasks
        });
    });
  }
};