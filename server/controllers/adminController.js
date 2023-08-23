import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import Admin from "../models/Admin.js";
import Committee from "../models/Committee.js";
import generateToken from "../utils/generateToken.js";

//@desc     login user
//@route    POST /admin/login
//@access   Public
export const verifyAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const lcEmail = email.toLowerCase();
    const admin = await Admin.findOne({ email: lcEmail });
    if (!admin) return res.status(400).json({ msg: "Invalid Credentials. " });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials. " });
    const user = await Admin.findOne({ email: lcEmail }).select("-password");
    console.log(user._id);
    generateToken(res, user._id);
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//@desc     logout user
//@route    POST /admin/logout
//@access   Public
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "User Logged Out" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//@desc     add a new convenor
//@route    POST /admin/addConvenor
//@access   private {admin}
export const addConvenor = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, committeeId, committeeName, role, mobile } =
      req.body;
    const lcEmail = email.toLowerCase();
    const user = await Admin.findOne({ email: lcEmail });
    if (user) {
      res.status(409).json({ error: "Email already exits" });
    } else {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      const existingConvenor = await Admin.findOne({
        committeeId: committeeId,
      });
      if (existingConvenor) {
        const filterAdmin = { committeeId: committeeId };
        const updateAdmin = {
          email: lcEmail,
          password: passwordHash,
          name,
          role,
          committeeName,
          committeeId,
          mobile,
        };
        const updatedConvenor = await Admin.findOneAndUpdate(
          filterAdmin,
          updateAdmin,
          { new: true }
        );
        const filterCommittee = { _id: committeeId };
        const updateCommittee = {
          convenorName: updatedConvenor.name,
          convenorId: updatedConvenor._id,
        };
        const updatedCommittee = await Committee.findOneAndUpdate(
          filterCommittee,
          updateCommittee,
          { new: true }
        );
        res.status(201).json({ updatedConvenor, updatedCommittee });
      } else {
        const newConvenor = new Admin({
          email: lcEmail,
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

//@desc     get list of convenors
//@route    GET /admin/convenors
//@access   private {admin}
export const getConvenors = async (req, res) => {
  try {
    const convenors = await Admin.find({ role: "convenor" }).select(
      "-password"
    );
    res.status(200).json(convenors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc     delete a  convenor
//@route    POST /admin/deleteConvenor
//@access   private {admin}
export const deleteConvenor = async (req, res) => {
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

//@desc     add a new member
//@route    POST /admin/addMember
//@access   private {admin,convenor}
export const addMember = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      memberName,
      memberEmail,
      memberPassword,
      committeeId,
      committeeName,
      role,
      mobile,
    } = req.body;
    const lcEmail = memberEmail.toLowerCase();

    const user = await Admin.findOne({ email: lcEmail });
    if (user) {
      res.status(400).json({ msg: "Email already exits" });
    } else {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(memberPassword, salt);
      const newMember = new Admin({
        email: lcEmail,
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

//@desc     get list of members
//@route    GET /admin/members
//@access   private {admin}
export const getMembers = async (req, res) => {
  try {
    const members = await Admin.find({ role: "member" }).select("-password");
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc     delete a  member
//@route    POST /admin/deleteMember
//@access   private {admin,convenor}
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

//@desc     get list of members of a particular committee
//@route    POST /admin/committeeMembers
//@access   private {convenor, member}
export const getCommitteeMembers = async (req, res) => {
  try {
    const { committeeId } = req.body;
    const filter = { committeeId: committeeId };
    const committeeMembers = await Admin.find(filter).select("-password");
    if (committeeMembers.length === 0) {
      return res.status(404).json({
        message: "No committee members found for the given committee ID",
      });
    }
    res.status(200).json(committeeMembers);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

//@desc     changed password
//@route    POST /admin/changePassword
//@access   private {admin, convenor, member}
export const changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { currentPassword, newPassword, cNewPassword, userId } = req.body;

    const user = await Admin.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Current Password is Not Valid!" });
    }

    if (newPassword !== cNewPassword) {
      return res.status(400).json({ msg: "New Passwords do not match!" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPassword, salt);
    const filter = { _id: userId };
    const update = {
      password: passwordHash,
    };
    const updatedUser = await Admin.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(201).json({ msg: "Password Changed Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};
