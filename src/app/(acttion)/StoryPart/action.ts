"use server";

import { connectToDatabase } from "@/lib/mongodb";
import Story from "@/models/Story";
import StoryPart from "@/models/StoryPart";
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
interface StoryWithPartResponse {
  story: {
    _id: string;
    title: string;
    description: string;
    coverImage?: string;
    parts: Array<{
      _id: string;
      title: string;
    }>;
  };
  part: {
    _id: string;
    title: string;
    content: string;
    visibility: string;
    createdAt: string;
  };
}

// Define a type for the minimal part information
type MinimalPart = {
  _id: mongoose.Types.ObjectId;
  title: string;
};

export async function getStoryAndPart(
  storyId: string,
  partId: string
): Promise<StoryWithPartResponse | null> {
  try {
    await connectToDatabase();

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Fetch the story with minimal part details
      const story = await Story.findById(storyId)
        .select("title description coverImage")
        .session(session)
        .populate<{ parts: MinimalPart[] }>({
          path: "parts",
          select: "_id title",
        })
        .lean();

      if (!story) {
        await session.abortTransaction();
        session.endSession();
        return null;
      }

      // 2. Verify the part exists in this story
      const partExistsInStory = await Story.exists({
        _id: storyId,
        parts: partId,
      }).session(session);

      if (!partExistsInStory) {
        await session.abortTransaction();
        session.endSession();
        return null;
      }

      // 3. Fetch the full part details
      const part = await StoryPart.findById(partId)
        .select("title content visibility createdAt")
        .session(session)
        .lean();

      if (!part) {
        await session.abortTransaction();
        session.endSession();
        return null;
      }

      await session.commitTransaction();
      session.endSession();

      // Convert all ObjectIds to strings
      return {
        story: {
          _id: story._id.toString(),
          title: story.title,
          description: story.description,
          coverImage: story.coverImage,
          parts: story.parts.map((p) => ({
            _id: p._id.toString(),
            title: p.title,
          })),
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
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error("Error fetching story and part:", error);
    throw new Error("Failed to fetch story and part");
  }
}
