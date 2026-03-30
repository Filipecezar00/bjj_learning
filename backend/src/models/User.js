import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Preencha seu nome para Concluir"],
    },
    email: {
      type: String,
      required: [true, "Preencha o email para Concluir"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "A senha é obrigatória"],
      minlength: 6,
    },
    memory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Memory",
    },
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
