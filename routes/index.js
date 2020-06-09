const smsRouter = require('express').Router();
const { sendSms, checkBalance } = require('../controller/index');

smsRouter.post('/send', sendSms);

smsRouter.get('/balance', checkBalance);

module.exports = smsRouter;
