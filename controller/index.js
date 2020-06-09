const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

exports.sendSms = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};

exports.checkBalance = (req, res) => {

};