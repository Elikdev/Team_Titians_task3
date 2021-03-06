const config = require('../config/index');
const twilio = require('twilio');
const statusCode = require('http-status');
const client = twilio(config.ACCOUNT_SID, config.AUTH_TOKEN);
const Sms = require('../models/index');
const request = require('request-promise');

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
		const sentSms = await client.messages.create(smsOptions);
		if (sentSms) {
			const sms = new Sms({
				message,
				mobile_num,
			});
			const savedSms = await sms.save();
			console.log('message sent and saved', savedSms);
			return res.status(statusCode.OK).json({
				message: 'message sent successfully',
				sentSms: sentSms.sid,
			});
		}
	} catch (error) {
		console.log(`error in sending sms >>> ${error.code}`);
		return res.status(statusCode.SERVICE_UNAVAILABLE).json({
			message: 'error in sending sms.. try again later',
		});
	}
};

exports.checkBalance = async (req, res) => {
	try {
		var options = {
			uri: `https://api.twilio.com/2010-04-01/Accounts/${config.ACCOUNT_SID}/Balance.json`,
			auth: {
				user: config.ACCOUNT_SID,
				pass: config.AUTH_TOKEN,
			},
			json: true,
		};

		const body = await request(options);
		if (body) {
			return res.status(statusCode.OK).json({
				message: `Your current account balance is ${body.balance} in ${body.currency}`,
			});
		} else {
			return res.status(statusCode.BAD_REQUEST).json({
				message: `An error occured while processing your request`,
			});
		}
	} catch (error) {
		console.log(`error in checking sms balance >>> ${error.code}`);
		return res.status(statusCode.SERVICE_UNAVAILABLE).json({
			message: 'Unable to check sms balance.. try again later',
		});
	}
};

exports.allSms = async (req, res) => {
	try {
		const sentMessages = await Sms.find().select('-__v');
		return res.status(statusCode.OK).json({
			message: `${sentMessages.length} ${
				sentMessages.length > 1 ? `Messages` : `Message`
			} found`,
			sentMessages,
		});
	} catch (error) {
		console.log('error from getting all sent messages >>>>> ', error);
		return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
			message: 'Something went wrong. Try again.',
		});
	}
};
