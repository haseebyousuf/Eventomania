import User from "../models/User.js";

export const registerStudent = async (req, res) => {
  try {
      const { name, regNo, semester, course, department, event, type } =
          req.body;
          //check if student already registered for the given event
      const user = await User.find({
          regNo: regNo,
          event: { $elemMatch: { id: event.id } },
      });
      //return error if student already registered
      if (user.length > 0) {
          return res.status(400).json({ msg: "You Have Already Registered!" });
      }
      //create new user
      const newUser = new User({
          name,
          regNo,
          semester,
          course,
          department,
          event,
          type,
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
export const registerFaculty = async (req, res) => {
  try {
      const { name, employeeId, designation, department, event, type } =
          req.body;
          //check if faculty already registered for the given event
      const user = await User.find({
        employeeId: employeeId,
          event: { $elemMatch: { id: event.id } },
      });
      //return error if faculty already registered
      if (user.length > 0) {
          return res.status(400).json({ msg: "You Have Already Registered!" });
      }
      //create new user
      const newUser = new User({
          name,
          employeeId,
          designation,
          department,
          event,
          type,
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
      const users = await User.find();
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}
