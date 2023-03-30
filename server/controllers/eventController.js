import Event from "../models/Event.js";
export const createEvent  = async (req, res) => {
  try {
    // console.log(req.files);
    const {banner, orderFile} = req.files;
    const bannerName = banner[0].filename;
    const bannerPath = banner[0].path;
    const orderFileName = orderFile[0].filename;
    const orderFilePath = orderFile[0].path;

    console.log(bannerName,bannerPath,orderFilePath);
    const{ name, venue, startDate, endDate, description, recomendedAudiance, committee, createdBy} = req.body;
    const parsedCommittee = JSON.parse(committee);
    const parsedCreator = JSON.parse(createdBy);

    const newEvent = new Event({name, venue, startDate, endDate, description, recomendedAudiance,bannerName,bannerPath, orderFileName,orderFilePath, committee:parsedCommittee, createdBy: parsedCreator});
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}