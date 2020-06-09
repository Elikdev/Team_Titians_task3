require('dotenv').config();

module.exports = {
	ACCOUNT_SID: process.env.ACCOUNT_SID,
	AUTH_TOKEN: process.env.AUTH_TOKEN,
	TWILIO_NUMBER: process.env.TWILIO_NUMBER,
	MONGODBURI: process.env.MONGOURI
};
