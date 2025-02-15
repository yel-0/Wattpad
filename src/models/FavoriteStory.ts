import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IFavoriteStory extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  story: Types.ObjectId;
}

const FavoriteStorySchema: Schema<IFavoriteStory> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    story: { type: Schema.Types.ObjectId, ref: "Story", required: true },
  },
  { timestamps: true }
);

const FavoriteStory: Model<IFavoriteStory> =
  mongoose.models.FavoriteStory ||
  mongoose.model<IFavoriteStory>("FavoriteStory", FavoriteStorySchema);

export default FavoriteStory;
