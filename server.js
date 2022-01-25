require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const connectionString = process.env.DATABASE_URL;
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const apiRouter = require('./route/api');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

(async function() {
    const PORT = process.env.PORT || 5000;

    app.use(express.json());
    app.use(cookieParser());
    app.use(logger);
    
    if(process.env.NODE_ENV === 'production') {
        app.use(express.static(path.resolve(__dirname, 'client', 'build')));
    }
    
    app.use('/api', apiRouter);
    app.use(errorHandler);
    
    await mongoose.connect(connectionString);
    console.log('Connected to database');

    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
})();
