import User from "../models/User.js";

export const registerStudent = async (req, res) => {
  try {
      const { name, regNo, semester, course, department, event, type } =
          req.body;
          //check if student already registered for the given event
      const user = await User.find({
          regNo: regNo,
          event: { $elemMatch: { name: event.name } },
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

