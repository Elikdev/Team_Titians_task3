const smsRouter = require('express').Router();
const { sendSms, checkBalance } = require('../controller/index');

smsRouter.post('/send', sendSms);

smsRouter.get('/balance/:number', checkBalance);

module.exports = smsRouter;
