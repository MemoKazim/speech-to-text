const mongoose = require("mongoose");

const reportShcema = new mongoose.Schema({
  name: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Success", "Error"],
  },
  generatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  textData: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date().getDate(),
  },
});

module.exports = new mongoose.model("Report", reportShcema);
