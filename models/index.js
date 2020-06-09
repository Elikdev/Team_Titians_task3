const mongoose = require("mongoose");
const { Schema } = mongoose;

const smsSchema = new Schema(
  {
    mobile_num: {
        type: Number
    },
    message: {
        type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sms", smsSchema);
