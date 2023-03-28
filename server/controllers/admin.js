import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Committee from "../models/Committee.js";

// export const getAdmin = async (req, res) =>{
//   try {
//     const {id: {adminId}} = req.body; 
//     const admin = await Admin.findById(adminId);
//     res.status(200).json(admin)
//   } catch (error) {
//     res.status(404).json({message: error.message});
//   }
// }



export const getConvenors = async (req, res) =>{
  try {
    const convenors = await Admin.find({ role: 'convenor' }).select("-password");
    res.status(200).json(convenors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const verifyAdmin = async(req, res) =>{
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });
    if (!admin) return res.status(400).json({ msg: "Admin does not exist. " });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials. " });
    const user = await Admin.findOne({ email: email }).select("-password");
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {expiresIn: "1hr"});
    res.status(200).json({  token, user  });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const createAdmin  = async (req, res) => {
  try {
    const{ email, password, name, role, committee} = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({email, password:passwordHash, name, role, committee});
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export const addConvenor = async(req,res) => {
  try{
    const { name,email, password, committeeId, committeeName,role, mobile } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({email, password:passwordHash, name, role, committeeName, committeeId, mobile});
    const savedAdmin = await newAdmin.save();
    const filter= {_id: committeeId};
    const update = {convenorName: savedAdmin.name, convenorId: savedAdmin._id};
    const updatedCommittee = await Committee.findOneAndUpdate(filter,update, {new:true});
    res.status(201).json( {savedAdmin,updatedCommittee});
  }catch(err){
    res.status(500).json({ error: err });
  }
}
