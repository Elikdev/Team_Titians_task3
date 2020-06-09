const config = require('../config/index');
const twilio = require('twilio');
const statusCode = require('http-status');
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

exports.checkBalance = async (req, res) => {};
