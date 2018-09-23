'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const orderRoutes = require('./api/routes/orderRoute');
const productRoutes = require('./api/routes/productRoute');
const paymentRoutes = require('./api/routes/paymentRoute');
const categoryRoutes = require('./api/routes/categoryRoute');
const authRoutes = require('./api/routes/authRoute');


const options = {
	socketTimeoutMS: 0,
	keepAlive: true,
	reconnectTries: 30,
	useNewUrlParser: true
};

// mongodb://<dbuser>:<dbpassword>@ds020228.mlab.com:20228/soc

const dbUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds129541.mlab.com:29541/${process.env.DB_HOST}`;

mongoose.connect(dbUrl, options).then(
	() => { console.log('db conncted'); },
	err => {console.log(err);}
);

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
});

app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
app.use('/payments', paymentRoutes);
app.use('/categories', categoryRoutes);
app.use('/auth', authRoutes);

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