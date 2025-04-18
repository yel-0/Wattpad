import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IStoryPart extends Document {
  _id: Types.ObjectId;
  story: Types.ObjectId;
  title: string;
  content: string;
  visibility: "public" | "private";
  createdAt: Date;
}

const StoryPartSchema: Schema<IStoryPart> = new Schema(
  {
    story: { type: Schema.Types.ObjectId, ref: "Story", required: true },
    title: { type: Schema.Types.String, required: true },
    content: {
      type: Schema.Types.Mixed, // This will accept any object, including JSONContent
      required: true,
    },
    visibility: {
      type: Schema.Types.String,
      enum: ["public", "private"],
      default: "public",
    },
  },
  { timestamps: true }
);

const StoryPart: Model<IStoryPart> =
  mongoose.models.StoryPart ||
  mongoose.model<IStoryPart>("StoryPart", StoryPartSchema);
export default StoryPart;
