import { Schema, model } from "mongoose";

import { UserType } from "../types";

const UserSchema = new Schema<UserType>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: "user",
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

export default model<UserType>("Users", UserSchema);
