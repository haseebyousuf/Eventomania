import Event from "../models/Event.js";
export const createEvent  = async (req, res) => {
  try {
    //get files from req.files
    const {banner, order} = req.files;
    const bannerName = banner[0].filename;
    const bannerPath = banner[0].path;
    const orderName = order[0].filename;
    const orderPath = order[0].path;
    //get rest of event details form req.body
    const{ name, venue, startDate, endDate, description, recomendedAudiance, committee, createdBy} = req.body;
    //parse committee and creator details
    const parsedCommittee = JSON.parse(committee);
    const parsedCreator = JSON.parse(createdBy);
    //save data to db
    const newEvent = new Event({name, venue, startDate, endDate, description, recomendedAudiance,bannerName,bannerPath, orderName,orderPath, committee:parsedCommittee, createdBy: parsedCreator});
    const savedEvent = await newEvent.save();
    //send success response
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getUnpublishedEvents = async(req, res) =>{
  try {
    const events = await Event.find({ isPublished: "false" })
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
export const publishEvent = async(req, res) =>{
  try {
    const {id} = req.body;
    const filter= {_id: id};
    const update = {isPublished: "true"};
    const publishedEvent = await Event.findOneAndUpdate(filter,update, {new:true});
    res.status(201).json( publishedEvent);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}