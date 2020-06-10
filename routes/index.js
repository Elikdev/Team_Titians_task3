const smsRouter = require('express').Router();
const { sendSms, checkBalance, allSms } = require('../controller/index');

smsRouter.post('/send', sendSms);

smsRouter.get('/balance', checkBalance);

smsRouter.get('/all', allSms);

module.exports = smsRouter;
