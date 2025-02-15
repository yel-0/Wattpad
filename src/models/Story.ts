import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IStory extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  author: Types.ObjectId;
  genre: string[];
  coverImage?: string;
  parts: Types.ObjectId[];
  likes: number;
  views: number;
  category: string;
  language: string;
  mainCharacters: string[];
  visibility: "public" | "private";
  createdAt: Date;
}

const StorySchema: Schema<IStory> = new Schema(
  {
    title: { type: Schema.Types.String, required: true, trim: true },
    description: { type: Schema.Types.String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    genre: [{ type: Schema.Types.String }],
    coverImage: { type: Schema.Types.String },
    parts: [{ type: Schema.Types.ObjectId, ref: "StoryPart" }],
    likes: { type: Schema.Types.Number, default: 0 },
    views: { type: Schema.Types.Number, default: 0 },
    category: { type: Schema.Types.String, required: true },
    language: { type: Schema.Types.String, required: true },
    mainCharacters: [{ type: Schema.Types.String, required: true }],
    visibility: {
      type: Schema.Types.String,
      enum: ["public", "private"],
      default: "public",
    },
  },
  { timestamps: true }
);

const Story: Model<IStory> =
  mongoose.models.Story || mongoose.model<IStory>("Story", StorySchema);
export default Story;
