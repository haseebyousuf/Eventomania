import fs from "fs";
import moment from "moment";

import Admin from "../models/Admin.js";
import Event from "../models/Event.js";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateCertificate } from "../utils/generateCertificate.js";
import { validationResult } from "express-validator";

//@desc     create a new Event
//@route    POST /event/createEvent
//@access   private {convenor, member}
export const createEvent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //get files from req.files
    const { banner, order } = req.files;
    const bannerName = banner[0].filename;
    const bannerPath = banner[0].path;
    const orderName = order[0].filename;
    const orderPath = order[0].path;
    //get rest of event details form req.body
    const {
      name,
      venue,
      startDate,
      endDate,
      description,
      committee,
      createdBy,
    } = req.body;
    //parse committee and creator details
    const parsedCommittee = JSON.parse(committee);
    const parsedCreator = JSON.parse(createdBy);
    // save data to db
    const newEvent = new Event({
      name,
      venue,
      startDate,
      endDate,
      description,
      bannerName,
      bannerPath,
      orderName,
      orderPath,
      committee: parsedCommittee,
      createdBy: parsedCreator,
    });
    const savedEvent = await newEvent.save();
    const committeeId = parsedCommittee.id;
    const convenor = await Admin.findOne({ committeeId }).select("email");
    const admin = await Admin.findOne({ role: "admin" }).select("email");
    const convenorMailOptions = {
      from: "Eventomania <eventomaniasp@gmail.com>",
      to: convenor.email,
      subject: `New Event Created - ${name}`,
      text: `Hi,\n\nA new event has been created.\n\nEvent Name: ${name}.\nCreated By: ${parsedCreator.name}.\n\nPlease Login to review the event under Unapproved Events Section.\nRegards Team Eventomania.`,
    };
    sendEmail(convenorMailOptions);

    const adminMailOptions = {
      from: "Eventomania <eventomaniasp@gmail.com>",
      to: admin.email,
      subject: `New Event Created - ${name}`,
      text: `Hi,\n\nA new event has been created.\n\nEvent Name: ${name}.\nCreated By: ${parsedCreator.name}.\n\nPlease Login to review or Approve the event under Approve Events Section.\nRegards Team Eventomania.`,
    };
    sendEmail(adminMailOptions);

    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc     upload report of an Event
//@route    POST /event/uploadReport
//@access   private {convenor, member}
export const uploadReport = async (req, res) => {
  try {
    //get file from req.file
    const report = req.file;
    const reportName = report.filename;
    const reportPath = report.path;
    //get id of event  form req.body
    const { id } = req.body;
    //update event
    const filter = { _id: id };
    const update = { reportName, reportPath, status: true };
    const updatedEvent = await Event.findOneAndUpdate(filter, update, {
      new: true,
    });
    //send success response
    res.status(201).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc     upload photos of an Event
//@route    POST /event/uploadPhotos
//@access   private {convenor, member}
export const uploadPhotos = async (req, res) => {
  try {
    const uploadedPhotos = req.files;
    const photosArray = [];
    uploadedPhotos.forEach((photo) => {
      const compressedPath = photo.path.replace("photos", "compressedPhotos");
      const compressedFilename = photo.filename.replace(
        "photos",
        "compressedPhotos"
      );
      photosArray.push({
        filename: compressedFilename,
        path: compressedPath,
      });
    });
    const { id } = req.body;
    //update event
    const filter = { _id: id };
    const update = { photos: photosArray, isPhotoUploaded: true };
    const updatedEvent = await Event.findOneAndUpdate(filter, update, {
      new: true,
    });
    //send success response
    res.status(201).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc     get a single event
//@route    POST /events/getEvent
//@access   public
export const getEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findOne({ _id: eventId });
    if (!event) return res.status(404).json({ msg: "No Event Found " });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc     get a list of all unApproved events
//@route    GET /events/unapprovedEvents
//@access   private {admin}
export const getUnApprovedEvents = async (req, res) => {
  try {
    const events = await Event.find({ isApproved: "false" });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc     get a list of all unApproved events of a committee
//@route    POST /events/committeeUnapprovedEvents
//@access   private {convenor, member}
export const getCommitteeUnApprovedEvents = async (req, res) => {
  try {
    const { committeeId } = req.body;
    const events = await Event.find({
      isApproved: false,
      "committee.id": committeeId,
    });
    const sortedEvents = events.sort(
      (a, b) => moment(new Date(b.startDate)) - moment(new Date(a.startDate))
    );
    if (!events) res.status(401).json({ error: "No Events found" });
    res.status(200).json(sortedEvents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc     get a list of all published events
//@route    GET /events/publishedEvents
//@access   public
export const getPublishedEvents = async (req, res) => {
  try {
    const events = await Event.find({ isPublished: "true" });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc     get a list of all approved events
//@route    GET /events/approvedEvents
//@access   private {admin}
export const getApprovedEvents = async (req, res) => {
  try {
    const events = await Event.find({ isApproved: "true" });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc     get a list of all approved events of a committee
//@route    POST /events/committeeApprovedEvents
//@access   private {convenor, member}
export const getCommitteeApprovedEvents = async (req, res) => {
  try {
    const { committeeId } = req.body;
    const events = await Event.find({
      isApproved: true,
      "committee.id": committeeId,
    });
    const sortedEvents = events.sort(
      (a, b) => moment(new Date(b.startDate)) - moment(new Date(a.startDate))
    );
    if (!events) res.status(401).json({ error: "No Events found" });
    res.status(200).json(sortedEvents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc     approve an event
//@route    POST /events/approveEvent
//@access   private {admin}
export const approveEvent = async (req, res) => {
  try {
    const { id } = req.body;
    const filter = { _id: id };
    const update = { isPublished: "true", isApproved: "true" };
    const publishedEvent = await Event.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(201).json(publishedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc     toggle whether an event should be published or not
//@route    POST /events/togglePublish
//@access   private {admin}
export const togglePublish = async (req, res) => {
  try {
    const { id, isPublished } = req.body;
    const filter = { _id: id };
    const update = { isPublished: !isPublished };
    const updatedEvent = await Event.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(201).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc     delete an events
//@route    POST /events/deleteEvent
//@access   private {admin}
export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    // Fetch the event before deleting it to access the file paths
    const event = await Event.findById(eventId);
    const deletedEvent = await Event.deleteOne({ _id: eventId });
    if (deletedEvent) {
      // Delete associated files from local storage
      if (event.bannerPath) {
        fs.unlinkSync(event.bannerPath);
      }
      if (event.orderPath) {
        fs.unlinkSync(event.orderPath);
      }
      if (event.reportPath) {
        fs.unlinkSync(event.reportPath);
      }
      if (event.photos) {
        event.photos.forEach((photo) => {
          fs.unlinkSync(photo.path);
        });
      }
      await User.deleteMany({ "event.id": eventId });
      res.status(201).json({ msg: "Deleted Successfully" });
    } else {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//@desc     send certificates of an event
//@route    POST /events/sendCertificate
//@access   private {admin, convenor, member}
export const sendCertificate = async (req, res) => {
  try {
    const { id, eventDate } = req.body;

    try {
      const users = await User.find({ "event.id": id });
      for (const user of users) {
        const certificate = await generateCertificate(
          user.name,
          user.event[0].name,
          eventDate
        );

        if (user.email) {
          const mailOptions = {
            from: "Eventomania <eventomaniasp@gmail.com>",
            to: user.email,
            subject: `Event Certificate - ${user.event[0].name}`,
            text: `Dear ${user.name},\n\nThank You!\nFor attending the event "${user.event[0].name}". Attached to this email is your certificate.\n\nBest regards,\nTeam Eventomania .`,
            attachments: [
              {
                filename: `${user.name.split(" ")[0]}_certificate.pdf`,
                content: certificate,
              },
            ],
          };
          sendEmail(mailOptions);
        }
      }
      const filter = { _id: id };
      const update = { isCertificateGenerated: "true" };
      const updatedEvent = await Event.findOneAndUpdate(filter, update, {
        new: true,
      });
      if (updatedEvent) {
        res.status(200).json({ msg: "Certificates Sent" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
