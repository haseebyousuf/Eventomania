import { validationResult } from "express-validator";
import Committee from "../models/Committee.js";

//@desc     create a new committee
//@route    POST /committee/addCommittee
//@access   private {admin}
export const addCommittee = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, description } = req.body;
    const newCommittee = new Committee({ name, description });
    const savedCommittee = await newCommittee.save();
    res.status(201).json(savedCommittee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc     get list of committees
//@route    GET /committee/getCommittees
//@access   public
export const getCommittees = async (req, res) => {
  try {
    const committees = await Committee.find();
    res.status(200).json(committees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc     delete a committee
//@route    POST /committee/deleteCommittee
//@access   private {admin}
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
