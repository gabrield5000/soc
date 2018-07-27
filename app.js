const express = require('express');
const app = express();
const morgan = require('morgan');

const orderRoutes = require('./api/routes/orders.js');
const productRoutes = require('./api/routes/products.js');


app.use(morgan('dev'));
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);

app.use((req, res, next) => {
    const error = new Error('Not fund');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>  {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;