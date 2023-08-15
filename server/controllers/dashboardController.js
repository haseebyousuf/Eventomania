import moment from "moment";
import Admin from "../models/Admin.js";
import Committee from "../models/Committee.js";
import Event from "../models/Event.js";

//@desc     get admin dashboard stats
//@route    GET /dashboard/adminDashboardStats
//@access   private {admin}
export const adminDashboardStats = async (req, res) => {
  try {
    const currentYear = moment().year(); // Get the current year
    const currentMonth = moment().month(); // Get the current month (0-11)
    const approvedEvents = await Event.find({ isApproved: true }).exec();

    //EVENTS PER COMMITTEE
    const eventData = {};

    approvedEvents.forEach((event) => {
      event.committee.forEach((committee) => {
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

    const eventsPerCommittee = Object.values(eventData);

    //GET EVENTS PER MONTH
    const eventsCountByMonth = {}; // Create an object to store the count of events per month
    for (const event of approvedEvents) {
      const startDate = moment(new Date(event.startDate));
      if (
        startDate.year() === currentYear &&
        startDate.month() <= currentMonth
      ) {
        const monthName = startDate.format("MMM");
        if (eventsCountByMonth[monthName]) {
          eventsCountByMonth[monthName]++;
        } else {
          eventsCountByMonth[monthName] = 1;
        }
      }
    }

    // Generate an array of month names up to the current month
    // const allMonths = moment.monthsShort().slice(0, currentMonth + 1);
    const lastSixMonths = Array.from({ length: 8 }, (_, index) =>
      moment().subtract(index, "months").format("MMM")
    ).reverse();
    // Format data for Nivo line chart
    const eventsPerMonth = lastSixMonths.map((month) => ({
      x: month,
      y: eventsCountByMonth[month] || 0,
    }));
    const lastFiveMonths = Array.from({ length: 5 }, (_, index) =>
      moment().subtract(index, "months").format("MMM")
    ).reverse();
    // Format data for Nivo line chart
    const eventsPerMonthMobile = lastFiveMonths.map((month) => ({
      x: month,
      y: eventsCountByMonth[month] || 0,
    }));
    //END EVENTS PER MONTH
    const events = await Event.find().exec();

    const approvedEventsCount = events.filter(
      (event) =>
        event.isApproved &&
        moment(new Date(event.startDate)).year() === currentYear
    ).length;

    const unapprovedEventsCount = events.filter(
      (event) =>
        !event.isApproved &&
        moment(new Date(event.startDate)).year() === currentYear
    ).length;

    const upcomingEvents = events.filter(
      (event) =>
        (event.isApproved &&
          moment(new Date(event.startDate)).isAfter(moment())) ||
        moment(new Date(event.startDate)).isSame(moment())
    );

    const adminsCount = await Admin.countDocuments().exec();
    const committeesCount = await Committee.countDocuments().exec();

    res.status(200).json({
      upcomingEvents,
      eventsPerCommittee,
      eventsPerMonth,
      eventsPerMonthMobile,
      approvedEventsCount,
      unapprovedEventsCount,
      adminsCount,
      committeesCount,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching dashboard stats." });
  }
};

//@desc     get committee dashboard stats
//@route    POST /dashboard/committeeDashboardStats
//@access   private {convenor,member}
export const committeeDashboardStats = async (req, res) => {
  try {
    const currentYear = moment().year(); // Get the current year
    const currentMonth = moment().month(); // Get the current month (0-11)
    const committeeId = req.body.committeeId; // Get the committee ID from the request body

    const committee = await Committee.findById(committeeId).exec();

    if (!committee) {
      return res.status(404).json({ error: "Committee not found" });
    }

    const approvedEvents = await Event.find({
      isApproved: true,
      "committee.id": committeeId,
    }).exec();

    const upcomingEvents = approvedEvents.filter(
      (event) =>
        moment(new Date(event.startDate)).isAfter(moment()) ||
        moment(new Date(event.startDate)).isSame(moment())
    );

    //EVENTS PER COMMITTEE
    const eventData = {};

    approvedEvents.forEach((event) => {
      event.createdBy.forEach((member) => {
        const memberId = member.id;
        const memberName = member.name;

        if (!eventData[memberId]) {
          eventData[memberId] = {
            id: memberId,
            label: memberName,
            value: 0,
          };
        }

        eventData[memberId].value++;
      });
    });

    const eventsPerMember = Object.values(eventData);

    //EVENTS PER MONTH OF COMMITTEE
    const eventsCountByMonth = {}; //object to store count of events per month

    for (const event of approvedEvents) {
      const startDate = moment(new Date(event.startDate));
      if (
        startDate.year() === currentYear &&
        startDate.month() <= currentMonth
      ) {
        const monthName = startDate.format("MMM");
        if (eventsCountByMonth[monthName]) {
          eventsCountByMonth[monthName]++;
        } else {
          eventsCountByMonth[monthName] = 1;
        }
      }
    }

    // Generate an array of month names up to the current month
    // const allMonths = moment.monthsShort().slice(0, currentMonth + 1);
    const lastSixMonths = Array.from({ length: 8 }, (_, index) =>
      moment().subtract(index, "months").format("MMM")
    ).reverse();
    // Format data for Nivo line chart
    const eventsPerMonth = lastSixMonths.map((month) => ({
      x: month,
      y: eventsCountByMonth[month] || 0,
    }));
    const lastFiveMonths = Array.from({ length: 5 }, (_, index) =>
      moment().subtract(index, "months").format("MMM")
    ).reverse();
    // Format data for Nivo line chart
    const eventsPerMonthMobile = lastFiveMonths.map((month) => ({
      x: month,
      y: eventsCountByMonth[month] || 0,
    }));
    //END OF EVENTS PER MONTH OF COMMITTEE

    const events = await Event.find({ "committee.id": committeeId }).exec();

    const approvedEventsCount = events.filter(
      (event) =>
        event.isApproved &&
        moment(new Date(event.startDate)).year() === currentYear
    ).length;

    const unapprovedEventsCount = events.filter(
      (event) =>
        !event.isApproved &&
        moment(new Date(event.startDate)).year() === currentYear
    ).length;

    const pendingReportCount = events.filter(
      (event) => event.isApproved && event.status === false
    ).length;

    const adminsCount = await Admin.countDocuments({
      committeeId: committeeId,
    }).exec();

    res.status(200).json({
      approvedEventsCount,
      upcomingEvents,
      eventsPerMonth,
      eventsPerMonthMobile,
      eventsPerMember,
      unapprovedEventsCount,
      pendingReportCount,
      adminsCount,
    });
  } catch (error) {
    res.status(500).json({
      error:
        "An error occurred while fetching dashboard stats for the committee.",
    });
  }
};
