import mongoose, { Schema, Document, Model, Types } from "mongoose";
import argon2 from "argon2";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string; // 'name' is required and unique
  userName?: string; // 'userName' is optional and not unique
  email: string;
  password: string;
  profileImage: string; // Field for profile image
  bgImage: string; // Field for background image
  isAdmin?: boolean;
  stories: Types.ObjectId[];
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  favorites: Types.ObjectId[];
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], unique: true }, // 'name' is unique and required
    userName: { type: String, required: false }, // 'userName' is optional
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
    profileImage: { type: String, default: "" }, // Field for profile image (URL or path)
    bgImage: { type: String, default: "" }, // Field for background image (URL or path)
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
