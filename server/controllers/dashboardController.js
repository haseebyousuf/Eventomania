import Admin from "../models/Admin.js";
import Committee from "../models/Committee.js";
import Event from "../models/Event.js";
import moment from 'moment'

export const adminDashboardStats = async (req, res) => {
  try {
    
    const currentYear = moment().year();
    const events = await Event.find().exec();
    const approvedEventsCount = events.filter(event =>
      event.isApproved &&
      moment(event.startDate).year() === currentYear
    ).length;
    const unapprovedEventsCount = events.filter(event =>
      !event.isApproved &&
      moment(event.startDate).year() === currentYear
    ).length;
    const upcomingEvents = events.filter(event =>
      event.isApproved &&
      moment(event.startDate).isAfter(moment()) ||
                            moment(event.startDate).isSame(
                                moment(),
                                "day",
                                "month",
                                "year"
                            )
    );

    const adminsCount = await Admin.countDocuments().exec();
    const committeesCount = await Committee.countDocuments().exec();

    res.status(200).json({
      upcomingEvents,
      approvedEventsCount,
      unapprovedEventsCount,
      adminsCount,
      committeesCount,
    });
  } catch (error) {
    console.log('Error:', error); // Log the error for debugging
    res.status(500).json({ error: 'An error occurred while fetching dashboard stats.' });
  }
};


export const dashboardStatsByCommittee = async (req, res) => {

  try {
    const committeeId = req.body.committeeId;
    const currentYear = moment().year();

    const committee = await Committee.findById(committeeId).exec();

    if (!committee) {
      return res.status(404).json({ error: 'Committee not found' });
    }

    const events = await Event.find({ 'committee.id': committeeId }).exec();

    const approvedEventsCount = events.filter(event =>
      event.isApproved &&
      moment(event.startDate).year() === currentYear
    ).length;

    const unapprovedEventsCount = events.filter(event =>
      !event.isApproved &&
      moment(event.startDate).year() === currentYear
    ).length;
    const pendingReportCount = events.filter(event =>
      event.isApproved && event.status === false
    ).length;



    const adminsCount = await Admin.countDocuments({ 'committeeId': committeeId }).exec();

    res.status(200).json({
      approvedEventsCount,
      unapprovedEventsCount,
      pendingReportCount,
      adminsCount,
    });
  } catch (error) {
    console.log('Error:', error); // Log the error for debugging
    res.status(500).json({ error: 'An error occurred while fetching dashboard stats for the committee.' });
  }
};

export const eventsPerCommittee = async (req, res) => {
  try {
    const events = await Event.find({ isApproved: "true" }).exec();

    const eventData = {};

    events.forEach(event => {
      event.committee.forEach(committee => {
        const committeeId = committee.id;
        const committeeName = committee.name;

        if (!eventData[committeeId]) {
          eventData[committeeId] = {
            id: committeeId,
            label: committeeName,
            value: 0,
          };
        }

        eventData[committeeId].value++;
      });
    });

    const formattedData = Object.values(eventData);

    res.status(200).json(formattedData);
  } catch (error) {
    console.log('Error:', error); // Log the error for debugging
    res.status(500).json({ error: 'An error occurred while fetching events per committee.' });
  }
};