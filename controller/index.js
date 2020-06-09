const config = require('../config/index');
const twilio = require('twilio');
const statusCode = require('http-status');
const fetch = require('node-fetch');
const client = twilio(config.ACCOUNT_SID, config.AUTH_TOKEN);

exports.sendSms = async (req, res) => {
	const { message, mobile_num } = req.body;
	if (!message || message == ' ') {
		return res.status(statusCode.PRECONDITION_FAILED).json({
			message: 'message field is empty',
		});
	}
	if (!mobile_num || mobile_num == ' ') {
		return res.status(statusCode.PRECONDITION_FAILED).json({
			message: 'mobile number field is empty',
		});
	}

	try {
		smsOptions = {
			body: message,
			from: config.TWILIO_NUMBER,
			to: mobile_num,
		};
		const sendSms = await client.messages.create(smsOptions);
		if (sendSms) {
			return res.status(statusCode.OK).json({
				message: 'message sent successfully',
				sendSms,
			});
		}
	} catch (error) {
		console.log(`error in sending sms >>> ${error}`);
		return res.status(statusCode.SERVICE_UNAVAILABLE).json({
			message: 'error in sending sms.. try again later',
		});
	}
};

exports.checkBalance = async (req, res) => {
	const balanceUrl = `https://api.twilio.com/2010-04-01/Accounts/${config.ACCOUNT_SID}/Balance.json`;
	try {
		const response = await fetch(balanceUrl);
		const data = await response.json();
		console.log(data);
		return res.status(statusCode.OK).json({
			message: 'Received sms balance',
			balance: data.balance,
			currency: data.currency
		})
	} catch (error) {
		console.log(`error in checking sms balance >>> ${error}`);
		return res.status(statusCode.SERVICE_UNAVAILABLE).json({
			message: 'Unable to check sms balance.. try again later',
		});
	}
};
