import mongoose from "mongoose";

const summarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  originalText: String,
  summary: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Summary", summarySchema);