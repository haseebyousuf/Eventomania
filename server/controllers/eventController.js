import Event from "../models/Event.js";
import moment from "moment";

export const createEvent  = async (req, res) => {
  try {
    //get files from req.files
    const {banner, order} = req.files;
    const bannerName = banner[0].filename;
    const bannerPath = banner[0].path;
    const orderName = order[0].filename;
    const orderPath = order[0].path;
    //get rest of event details form req.body
    const{ name, venue, startDate, endDate, description, recommendedAudience, committee, createdBy} = req.body;
    //parse committee and creator details
    const parsedCommittee = JSON.parse(committee);
    const parsedCreator = JSON.parse(createdBy);
    //save data to db
    const newEvent = new Event({name, venue, startDate, endDate, description, recommendedAudience,bannerName,bannerPath, orderName,orderPath, committee:parsedCommittee, createdBy: parsedCreator});
    const savedEvent = await newEvent.save();
    //send success response
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export const uploadReport  = async (req, res) => {
  try {
    //get file from req.file
    console.log("req.file",req.file);
    const report = req.file;
    console.log("report",report);
    const reportName = report.filename;
    const reportPath = report.path;    
    //get id of event  form req.body
    const{ id} = req.body;
    //update event
    const filter= {_id: id};
    const update = {reportName, reportPath, status:true};
    const updatedEvent = await Event.findOneAndUpdate(filter,update, {new:true});
    //send success response
    res.status(201).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getEvents = async(req,res) => {
  try{
    const events= await Event.find();
    res.status(200).json(events);

  }catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export const getUnApprovedEvents = async(req, res) =>{
  try {
    const events = await Event.find({ isApproved: "false" })
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export const getPublishedEvents = async(req, res) =>{
  try {
    const events = await Event.find({ isPublished: "true" })
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export const getApprovedEvents = async(req, res) =>{
  try {
    const events = await Event.find({ isApproved: "true" })
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export const approveEvent = async(req, res) =>{
  try {
    const {id} = req.body;
    const filter= {_id: id};
    const update = {isPublished: "true", isApproved: "true"};
    const publishedEvent = await Event.findOneAndUpdate(filter,update, {new:true});
    res.status(201).json( publishedEvent);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export const togglePublish = async(req, res) =>{
  try {
    const {id, isPublished} = req.body;
    const filter= {_id: id};
    const update = {isPublished: !isPublished};
    const updatedEvent = await Event.findOneAndUpdate(filter,update, {new:true});
    res.status(201).json( updatedEvent);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteEvent = async(req, res) => {
  try{
    const {eventId} = req.body;
    const deletedEvent = await Event.deleteOne({_id: eventId})
    if(deletedEvent){
      console.log(deletedEvent)
      res.status(201).json( {msg: "Deleted Successfully"});
    }else{
    res.status(500).json({ error: error.message });
    }

  }catch (error) {
    res.status(500).json({ error: error.message });
  }
}