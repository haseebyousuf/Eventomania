import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email:{
    type:String,
    required: true,
    max: 50,
    unique: true,
  },
  password:{
    type:String,
    required: true,
    min: 5
  },
  name:{
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  role:{
    type:String,
    enum: ['admin', 'convenor', 'member'],
    default: 'admin'
  },
  committeeName:{
    type: String,
    required: true,
  },
  committeeId:{
    type: String,
    required: true,
  },
  mobile:{
    type: "String",
    required: true,
  }
}, { timestamps: true });

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;