import mongoose from "mongoose";

const EventScheema = new mongoose.Schema({
  name:{
    type:String,
    required: true,
  },
  venue:{
    type:String,
    required: true,
  },
  startDate:{
    type: String,
    required: true,
    
  },
  endDate:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  recomendedAudiance:{
    type: String,
    required: true,
  },
  bannerPath: String,
  bannerName: String,
  orderPath: String,
  orderName: String,
  committee:[{
      id:{
        type:String,
      },
      name: {
        type: String,
      },
  }],
  createdBy:[{
    id:{
      type:String,
    },
    name: {
      type: String,
    },
}],
  isPublished:{
    type: Boolean,
    default: "false",
  }
}, { timestamps: true });

const Event = mongoose.model("Event", EventScheema);

export default Event;