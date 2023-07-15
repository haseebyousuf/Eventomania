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
export const getMembers = async (req, res) =>{
  try {
    const members = await Admin.find({ role: 'member' }).select("-password");
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getCommitteeMembers = async (req, res) =>{
  try {
    const {committeeId} = req.body;
    const filter = {committeeId:committeeId};
    const committeeMembers = await Admin.find(filter).select("-password");
    res.status(200).json(committeeMembers);
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
export const addConvenor = async (req, res) => {
  try {
    const { name, email, password, committeeId, committeeName, role, mobile } =
      req.body;
    //check if user with same email exits
    const user = await Admin.findOne({ email: email });
    if (user) {
      res.status(400).json({ msg: "Email already exits" });
    } else {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      const existingConvenor = await Admin.findOne({
        committeeId: committeeId,
      });
      if (existingConvenor) {
        const updatedConvenor = await Admin.findOneAndUpdate(
          { committeeId: committeeId },
          {
            email,
            password: passwordHash,
            name,
            role,
            committeeName,
            committeeId,
            mobile,
          },
          { new: true }
        );
        const filter = { _id: committeeId };
        const update = {
          convenorName: updatedConvenor.name,
          convenorId: updatedConvenor._id,
        };
        const updatedCommittee = await Committee.findOneAndUpdate(
          filter,
          update,
          { new: true }
        );
        res.status(201).json({ updatedConvenor, updatedCommittee });
      } else {
        const newConvenor = new Admin({
          email,
          password: passwordHash,
          name,
          role,
          committeeName,
          committeeId,
          mobile,
        });
        const savedConvenor = await newConvenor.save();
        const filter = { _id: committeeId };
        const update = {
          convenorName: savedConvenor.name,
          convenorId: savedConvenor._id,
        };
        const updatedCommittee = await Committee.findOneAndUpdate(
          filter,
          update,
          { new: true }
        );
        res.status(201).json({ savedConvenor, updatedCommittee });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteConvenor = async (req, res) => {
  console.log(req.body);
  try {
    const { convenorId, committeeId } = req.body;
    const deletedConvenor = await Admin.deleteOne({ _id: convenorId });
    if (deletedConvenor) {
      const filter = { _id: committeeId };
      const update = { convenorName: "-", convenorId: "-" };
      const updatedCommittee = await Committee.findOneAndUpdate(
        filter,
        update,
        { new: true }
      );
      res.status(201).json({ msg: "Deleted Successfully" });
    } else {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, msg: error.message });
  }
};

export const addMember = async (req, res) => {
  try {
    const {
      memberName,
      memberEmail,
      memberPassword,
      committeeId,
      committeeName,
      role,
      mobile,
    } = req.body;
    const user = await Admin.findOne({ email: memberEmail });
    if (user) {
      res.status(400).json({ msg: "Email already exits" });
    } else {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(memberPassword, salt);
      const newMember = new Admin({
        email: memberEmail,
        password: passwordHash,
        name: memberName,
        role,
        committeeName,
        committeeId,
        mobile,
      });
      const savedMember = await newMember.save();
      res.status(201).json({ savedMember });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const { memberId } = req.body;
    const deletedMember = await Admin.deleteOne({ _id: memberId });
    if (deletedMember) {
      res.status(201).json({ msg: "Deleted Successfully" });
    } else {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
