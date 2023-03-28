import Admin from "../models/Admin.js";
import Committee from "../models/Committee.js"

export const addCommittee = async(req,res) => {
  try {
    const{ name, description} = req.body;
    const newCommittee = new Committee({name,description});
    const savedCommittee = await newCommittee.save();
    res.status(201).json(savedCommittee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getCommittes = async(req, res) =>{
  try {
    const committees = await Committee.find();
    // const convenorIds = committees.map((committee) => committee._id);
    // console.log(convenorIds);
    
    // const convenorIds = committees.forEach(committee => {
    //   const convenorId = committee.convenor;
    //   return convenorId;
    // });
    // // const convenorId = committees.convenor;
    // // console.log(committees);
    // // const convenor = await Admin.findById(convenorId);
    // // if (!convenor) return res.status(400).json({ msg: "Convenor does not exist. " });
    // // const convenorName = convenor.name;
    res.status(200).json(committees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}