import mongoose from "mongoose";

const MemorySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    summary: {
      type: String,
      default: "",
    },
    recentMessages: [
      {
        role: String,
        content: String,
        category: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Memory", MemorySchema);
