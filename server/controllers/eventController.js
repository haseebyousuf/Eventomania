import fs from "fs";
import nodemailer from "nodemailer";
import Event from "../models/Event.js";
import User from "../models/User.js";
import { generateCertificate } from "../utils/generateCertificate.js";

export const createEvent = async (req, res) => {
  try {
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
    //save data to db
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
    //send success response
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
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

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getUnApprovedEvents = async (req, res) => {
  try {
    const events = await Event.find({ isApproved: "false" });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getPublishedEvents = async (req, res) => {
  try {
    const events = await Event.find({ isPublished: "true" });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getApprovedEvents = async (req, res) => {
  try {
    const events = await Event.find({ isApproved: "true" });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
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

export const sendCertificate = async (req, res) => {
  try {
    const { id } = req.body;

    try {
      const users = await User.find({ "event.id": id });
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL,
          pass: process.env.MAIL_PASS,
        },
      });

      for (const user of users) {
        const certificate = await generateCertificate(
          user.name,
          user.event[0].name
        );

        if (user.email) {
          const mailOptions = {
            from: "eventomaniasp@gmail.com",
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
          await transporter.sendMail(mailOptions);
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
