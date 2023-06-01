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
// Function to get events per month
export const eventsPerMonth = async (req, res) => {
  try {
    const currentYear = moment().year(); // Get the current year
    const currentMonth = moment().month(); // Get the current month (0-11)

    const events = await Event.find({ isApproved: true }).exec();

    // Create an object to store the count of events per month
    const eventsCountByMonth = {};
    for (const event of events) {
      const startDate = moment(event.startDate);
      if (
        startDate.year() === currentYear &&
        startDate.month() <= currentMonth
      ) {
        const monthName = startDate.format('MMM');
        if (eventsCountByMonth[monthName]) {
          eventsCountByMonth[monthName]++;
        } else {
          eventsCountByMonth[monthName] = 1;
        }
      }
    }

    // Generate an array of month names up to the current month
    const allMonths = moment.monthsShort().slice(0, currentMonth + 1);

    // Format data for Nivo line chart
    const formattedData = allMonths.map(month => ({
      x: month,
      y: eventsCountByMonth[month] || 0
    }));

    res.status(201).json(formattedData);
  } catch (error) {
    console.log('Error:', error); // Log the error for debugging
    res.status(500).json({ error: 'An error occurred while fetching events per month.' });
  }
};