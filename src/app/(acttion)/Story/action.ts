"use server";

import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";

export async function CreateStory(formData: {
  title: string;
  description: string;
  characters: string[];
  category: string;
  language: string;
  copyright: string;
  isMature: boolean;
}) {
  try {
    // Simulate saving data to a database (replace with actual DB logic)
    console.log("Received Story Data:", formData);

    // Example: If using a database, insert the data here
    // await db.story.create({ data: formData });

    return { success: true, message: "Story created successfully!" };
  } catch (error) {
    console.error("Error creating story:", error);
    return { success: false, message: "Failed to create story." };
  }
}
