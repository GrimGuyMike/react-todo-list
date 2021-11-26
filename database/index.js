const mongoose = require('mongoose');
const connectionString = process.env.DATABASE_URL;
const User = require('../model/User');
const Todo = require('../model/Todo');
const RefreshToken = require('../model/RefreshToken');

async function connect() {
    await mongoose.connect(connectionString);
};

connect();

module.exports = {
    User,
    Todo,
    RefreshToken
};