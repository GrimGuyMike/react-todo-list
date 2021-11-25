require('dotenv').config();
const express = require('express');
const app = express();
const apiRouter = require('./route/api');
const path = require('path');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api', apiRouter);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));
}

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));