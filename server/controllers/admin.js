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
export const getMembers = async (req, res) => {
  try {
    const members = await Admin.find({ role: "member" }).select("-password");
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCommitteeMembers = async (req, res) => {
  try {
    const { committeeId } = req.body;
    const filter = { committeeId: committeeId };
    const committeeMembers = await Admin.find(filter).select("-password");
    res.status(200).json(committeeMembers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });
    if (!admin) return res.status(400).json({ msg: "Admin does not exist. " });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials. " });
    const user = await Admin.findOne({ email: email }).select("-password");
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const { email, password, name, role, committee } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({
      email,
      password: passwordHash,
      name,
      role,
      committee,
    });
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
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

/**
 * The `changePassword` function is an asynchronous function that handles the logic for changing a
 * user's password in a Node.js application.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes properties such as the request headers, request body,
 * request method, and request URL.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * setting the status code, sending JSON data, or redirecting the client to another URL.
 * @returns a JSON response with a success message if the password is changed successfully, or an error
 * message if there is an error.
 */
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, cNewPassword, userId } = req.body;

    const user = await Admin.findOne({ _id: userId });
    if (user) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Current Password is Not Valid!" });
      if (newPassword !== cNewPassword)
        return res.status(400).json({ msg: "New Passwords do not match!" });
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(newPassword, salt);
      const filter = { _id: userId };
      const update = {
        password: passwordHash,
      };
      const updatedUser = await Admin.findOneAndUpdate(filter, update, {
        new: true,
      });
      if (updatedUser) {
        res.status(201).json({ msg: "Password Changed Successfully" });
      }
    } else {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
