require('dotenv').config();
const express = require('express');
const app = express();
const apiRouter = require('./route/api');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));
}

app.use('/api', apiRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));