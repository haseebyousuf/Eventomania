import mongoose from "mongoose";

const CommitteeSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  description:{
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  convenorName: {
    type: String,
    default: "",
  },
  convenorId: {
    type: String,
    default: "",
  },
  members: {
    type: Array,
    default: [],
  },
  events: {
    type: Array,
    default: [],
  },
  
}, { timestamps: true });

const Committee = mongoose.model("Committee", CommitteeSchema);

export default Committee;