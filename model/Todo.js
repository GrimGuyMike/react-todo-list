const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    text: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },
    
    userId: {
        type: String,
        required: true
    },
    
    done: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('todo', todoSchema);