const express = require('express');
const router = express.Router();
const { sendSms, checkBalance } = require('../controller/index');
// const sendNotify = require('../controller/send-sms');

// task1 send sms
router.post('/sms', sendSms);
router.get('/sms/balance', checkBalance);
// router.post('/sms', async (req, res) => {
//   const { message, number } = req.body;
//   if (!message || !number) {
//     const error = new Error('you must have a message and number');
//     console.log(error);
//     res
//       .status(400)
//       .json({ status: 'error', error: error.message })
//       .end();
//   }
//   try {
//     const sentSms = await sendNotify(message, number);
//     if (sentSms) {
//         console.log("Message sent");
//         return res.status(201).json({
//             status: "success",
//             data: `message sent successfully to ${number}`
//         })
//     }

//   } catch (error) {
//     console.log("error from sending sms >>>> ", error);
//     return res.status(500).json({
//         status: "error",
//         message: 'Unable to process your request. Try again.'
//     })
//   }
// });

module.exports = router;