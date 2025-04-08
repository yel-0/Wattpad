"use server";

import Story, { IStory } from "@/models/Story";
import { connectToDatabase } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { v2 as cloudinary } from "cloudinary";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dcgn707fg",
  api_key: "447553432962878",
  api_secret: "B392SZv18oPqrYoIviTDVaHEjq4",
});

export async function CreateStory(formData: FormData) {
  // Get session user ID from NextAuth
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return { success: false, message: "Unauthorized" };
  }

  const author = session.user.id;

  // Extract form fields
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const language = formData.get("language") as string;
  const visibility = formData.get("visibility") as "public" | "private";
  const copyright = parseInt(formData.get("copyright") as string, 10);

  // Extract cover image file
  const coverImage = formData.get("coverImage") as File;
  let coverImageUrl: string | undefined;

  try {
    // Connect to the database
    await connectToDatabase();

    // If a cover image is provided, upload it to Cloudinary
    if (coverImage) {
      const arrayBuffer = await coverImage.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Using the Promise approach for Cloudinary upload
      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              tags: ["story-cover"],
              upload_preset: "nextjs-server-actions-upload",
            },
            function (error, result) {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          )
          .end(buffer);
      });

      // Check if the Cloudinary upload was successful
      if (uploadResult?.secure_url) {
        coverImageUrl = uploadResult.secure_url;
        console.log("Cloudinary upload success, URL:", coverImageUrl);
      } else {
        console.error("Cloudinary upload failed, no URL received.");
        return { success: false, message: "Image upload failed." };
      }
    }

    // Create the new story document
    const newStory: IStory = new Story({
      title,
      description,
      author, // Use the author's user ID from session
      coverImage: coverImageUrl,
      parts: [], // You can add parts later
      likes: 0,
      views: 0,
      category,
      language,
      visibility,
      copyright,
    });

    // Save the new story to the database
    await newStory.save();

    // Return a success response with the story details
    return {
      success: true,
      message: "Story created successfully",
    };
  } catch (error) {
    console.error("Error creating story:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function GetStoriesByAuthor(page: number = 1) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return { success: false, message: "Unauthorized" };
    }

    const authorId = session.user.id;
    const limit = 10;
    const skip = (page - 1) * limit;

    await connectToDatabase();

    const [stories, totalCount] = await Promise.all([
      Story.find({ author: authorId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("parts") // 💡 This populates the parts field
        .lean(),

      Story.countDocuments({ author: authorId }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      success: true,
      stories,
      pagination: {
        page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    console.error("Error fetching stories:", error);
    return {
      success: false,
      message: "Failed to fetch stories",
    };
  }
}

export async function FetchStoriesByCategoryName(
  page: number = 1,
  categoryName: string
) {
  try {
    const limit = 10;
    const skip = (page - 1) * limit;

    await connectToDatabase();

    const [stories, totalCount] = await Promise.all([
      Story.find({ category: categoryName }) // Filter by category name
        .sort({ createdAt: -1 })
        .select("_id title visibility coverImage createdAt updatedAt language") // Only the fields you need
        .skip(skip)
        .limit(limit)
        .lean(),

      Story.countDocuments({ category: categoryName }), // Count the total stories for the category
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      success: true,
      stories: stories || [], // Ensure an empty array if undefined,
      pagination: {
        page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    console.error("Error fetching stories by category:", error);
    return {
      success: false,
      message: "Failed to fetch stories by category",
    };
  }
}

function extractPublicIdFromUrl(url: string): string | null {
  try {
    // Updated regex to handle folders before the filename
    const regex = /\/v\d+\/(.+?)\.\w{3,4}$/;
    const match = url.match(regex);

    return match ? match[1] : null;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
}

// Function to fetch Cloudinary resource by public ID
async function getCloudinaryResource(url: string) {
  try {
    const publicId = extractPublicIdFromUrl(url); // Extract the public ID from the URL

    if (!publicId) {
      console.error("Could not extract valid publicId from URL");
      return null;
    }

    // Ensure the publicId is decoded
    const decodedPublicId = decodeURIComponent(publicId);

    // Use the Cloudinary API to fetch the resource details by public ID
    const resource = await cloudinary.api.resource(decodedPublicId, {
      type: "upload",
    });

    if (resource && resource.public_id) {
      console.log("Public ID retrieved from Cloudinary:", resource.public_id);
      return resource.public_id;
    } else {
      console.error("Cloudinary resource not found");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving Cloudinary resource:", error);
    return null;
  }
}

// Function to delete the story and its cover image
export async function DeleteStoryById(storyId: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await connectToDatabase();

    // Fetch the story first
    const story = await Story.findOne({
      _id: storyId,
      author: session.user.id,
    });

    if (!story) {
      return { success: false, message: "Story not found or unauthorized." };
    }

    // If there's a cover image, delete it from Cloudinary
    if (story.coverImage) {
      const publicId = await getCloudinaryResource(story.coverImage); // Get public ID from Cloudinary

      if (publicId) {
        const destroyResult = await cloudinary.uploader.destroy(publicId);
        console.log("Cloudinary destroy result:", destroyResult); // Log result

        if (!destroyResult.result || destroyResult.result !== "ok") {
          console.error("Cloudinary image deletion failed:", destroyResult);
          return {
            success: false,
            message: "Failed to delete the image from Cloudinary.",
          };
        }
      }
    }

    // Delete the story from MongoDB
    await Story.deleteOne({ _id: storyId });

    return { success: true, message: "Story and image deleted successfully." };
  } catch (error) {
    console.error("Delete story error:", error);
    return { success: false, message: "An error occurred." };
  }
}

export async function FetchStoryById(storyId: string) {
  try {
    // Ensure the storyId is a valid ObjectId
    const objectId = new mongoose.Types.ObjectId(storyId);

    await connectToDatabase();

    // Fetch the story by its ID and populate the 'parts' field
    const story = await Story.findById(objectId)
      .populate("parts") // Populating the 'parts' field with full details
      .select(
        "_id title visibility views likes description coverImage createdAt updatedAt language parts"
      ) // Select only the necessary fields
      .lean();

    if (!story) {
      return {
        success: false,
        message: "Story not found",
      };
    }

    return {
      success: true,
      story, // Return the fetched story
    };
  } catch (error) {
    console.error("Error fetching story by ID:", error);
    return {
      success: false,
      message: "Failed to fetch story by ID",
    };
  }
}
