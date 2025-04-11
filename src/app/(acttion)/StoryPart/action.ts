"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Story from "@/models/Story";
import StoryPart from "@/models/StoryPart";
import { StoryAuthor } from "@/types/StoryAndPartsWithAuthor";
import { User } from "@/types/User";
import { JSONContent } from "@tiptap/react";
import mongoose from "mongoose";

type CreateStoryPartParams = {
  storyId: string;
  title: string;
  content: string;
  visibility: "public" | "private";
};

export async function createStoryPart({
  storyId,
  title,
  content,
  visibility,
}: CreateStoryPartParams) {
  try {
    await connectToDatabase();

    // Start a transaction to ensure both operations succeed or fail together
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Create the new story part
      const newPart = await StoryPart.create({
        story: storyId,
        title,
        content,
        visibility,
      });

      // 2. Update the story's parts array
      await Story.findByIdAndUpdate(
        storyId,
        { $push: { parts: newPart._id } },
        { new: true, session }
      );

      await session.commitTransaction();
      session.endSession();

      return {
        success: true,
        data: {
          _id: newPart._id.toString(),
          storyId: storyId.toString(),
        },
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error("Error creating story part:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create story part.",
    };
  }
}

export async function deleteStoryPart(storyPartId: string) {
  try {
    await connectToDatabase();

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Find the story part to get its parent story ID
      const part = await StoryPart.findById(storyPartId).session(session);
      if (!part) {
        throw new Error("Story part not found.");
      }

      const storyId = part.story;

      // 2. Delete the story part
      await StoryPart.findByIdAndDelete(storyPartId).session(session);

      // 3. Pull the part reference from the story
      await Story.findByIdAndUpdate(
        storyId,
        { $pull: { parts: storyPartId } },
        { new: true, session }
      );

      await session.commitTransaction();
      session.endSession();

      return {
        success: true,
        message: "Story part deleted successfully.",
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error("Error deleting story part:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete story part.",
    };
  }
}
interface UpdateStoryPartParams {
  storyPartId: string;
  title: string;
  content: JSONContent;
  visibility: "public" | "private";
}

export async function updateStoryPart({
  storyPartId,
  title,
  content,
  visibility,
}: UpdateStoryPartParams) {
  try {
    await connectToDatabase();

    // Start a transaction to ensure the operation is completed or rolled back in case of failure
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Update the existing story part
      const updatedPart = await StoryPart.findByIdAndUpdate(
        storyPartId,
        { title, content, visibility },
        { new: true, session }
      );

      if (!updatedPart) {
        throw new Error("Story part not found.");
      }

      await session.commitTransaction();
      session.endSession();

      return {
        success: true,
        data: {
          _id: updatedPart._id.toString(),
          storyId: updatedPart.story.toString(),
        },
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error("Error updating story part:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update story part.",
    };
  }
}

export async function getStoryAndPart(storyId: string, partId: string) {
  try {
    await connectToDatabase();

    // Fetch story with populated parts and author
    const story = await Story.findById(storyId)
      .select("title description coverImage author parts")
      .populate({
        path: "parts",
        select: "_id title",
      })
      .populate("author", "name email profileImage bgImage") // 👈 this is key!
      .lean();

    if (!story) {
      return null;
    }

    // Type assertion for parts array
    const parts = story.parts as unknown as Array<{
      _id: mongoose.Types.ObjectId;
      title: string;
    }>;

    // Check if part exists in story
    const partExists = parts.some((part) => part._id.toString() === partId);
    if (!partExists) {
      return null;
    }

    // Fetch the part details
    const part = await StoryPart.findById(partId)
      .select("title content visibility createdAt")
      .lean();

    if (!part) {
      return null;
    }

    return {
      story: {
        _id: story._id.toString(),
        title: story.title,
        description: story.description,
        coverImage: story.coverImage,
        parts: parts.map((p) => ({
          _id: p._id.toString(),
          title: p.title,
        })),
        author: story.author as unknown as StoryAuthor,
      },
      part: {
        _id: part._id.toString(),
        title: part.title,
        content: part.content,
        visibility: part.visibility,
        createdAt: part.createdAt.toISOString(),
      },
    };
  } catch (error) {
    console.error("Error fetching story and part:", error);
    throw new Error("Failed to fetch story and part");
  }
}
