const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    description: String,
    icon: String,
    icon_color: String,
});

module.exports = mongoose.model('Category', CategorySchema)