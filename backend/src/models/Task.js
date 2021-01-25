const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    description: String,
    status: String,
    start_date: Date,
    ending_date: Date,
    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
});

module.exports = mongoose.model('Task', TaskSchema)