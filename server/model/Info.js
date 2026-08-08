import mongoose from "mongoose";

const infoSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    travelers: {
      type: Number,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    travelStyle: {
      type: String,
      required: true,
    },
    interests: {
      type: [String],
      default: [],
    },
    notes: {
      type: String,
      default: "",
    },

    itinerary: {
      type: String,
      default: "",
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Info", infoSchema);