import mongoose, { Schema, Document, Model, Types } from "mongoose";
import argon2 from "argon2";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  stories: Types.ObjectId[];
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  favorites: Types.ObjectId[];
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
    isAdmin: { type: Boolean, default: false },
    stories: [{ type: Types.ObjectId, ref: "Story" }],
    followers: [{ type: Types.ObjectId, ref: "User" }],
    following: [{ type: Types.ObjectId, ref: "User" }],
    favorites: [{ type: Types.ObjectId, ref: "Story" }],
  },
  { timestamps: true }
);

UserSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await argon2.hash(this.password);
  }
  next();
});

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await argon2.verify(this.password, password);
};

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
