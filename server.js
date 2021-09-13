const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const todosRouter = require('./routes/api/todos');
const usersRouter = require('./routes/api/users');
const authRouter = require('./routes/api/auth');
const mongoURI = process.env.MONGO_URI;

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => console.log('Connected to the database!'))
.catch(err => console.log(err.message));

app.use(express.json());

app.use('/api/todos', todosRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

// Serve compiled React app from static folder if in production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));