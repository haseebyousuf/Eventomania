import Admin from "../models/Admin.js";
import Committee from "../models/Committee.js";

export const addCommittee = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCommittee = new Committee({ name, description });
    const savedCommittee = await newCommittee.save();
    res.status(201).json(savedCommittee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCommittees = async (req, res) => {
  try {
    const committees = await Committee.find();
    res.status(200).json(committees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCommittee = async (req, res) => {
  try {
    const { committeeId } = req.body;
    const deletedCommittee = await Committee.deleteOne({ _id: committeeId });
    if (deletedCommittee) {
      res.status(201).json({ msg: "Deleted Successfully" });
    } else {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
