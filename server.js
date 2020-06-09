require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoDbConnection = require('./config/dbconfig');
const smsRouter = require('./routes/index');

//load the database
mongoDbConnection();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/v1', (req, res) => {
	res.send(` Welcome to the API Version 1.0.0 of SMS Notification App 
        Please read the api documentation for how to go about its usage..
    `);
});

app.use('/api/v1/sms', smsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is up and running on port ${PORT}`);
});
