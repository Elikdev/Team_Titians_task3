// Task 1 === Send sms
module.exports = function sendNotify(message, number) {
  const send = number => {
    client.messages
    .create({
      body: message,
      from: process.env.NOTIFY_PHONE_NUMBER,
      to: number
    })
    .then(res => console.log(res.sid))
    // ! do more error handling
    .catch(err => console.log(err))
    .done();
  }
  return new Promise((resolve, reject) => {
    send(number);
    resolve(true);
  })
};