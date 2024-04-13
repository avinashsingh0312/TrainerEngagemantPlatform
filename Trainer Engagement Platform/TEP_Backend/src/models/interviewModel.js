// models/interviewModel.js

const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  businessRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company", // Assuming the reference is to the Company collection
    required: true,
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainer",
    required: true,
  },
  companyName : {type:String,required:true},
  amount: { type: Number, required: true },
  skill: { type: String, required: true },
  trainerEmail: { type: String, required: true },
  interviewDate: { type: Date, required: true },
  interviewTime: { type: String, required: true },
  interviewStatus: { type: String, default: "Pending" }, // Default status is "Pending"
});

module.exports = mongoose.model("Interview", interviewSchema);
