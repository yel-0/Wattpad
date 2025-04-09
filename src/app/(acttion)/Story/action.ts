"use server";

import Story, { IStory } from "@/models/Story";
import { connectToDatabase } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { v2 as cloudinary } from "cloudinary";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import StoryPart from "@/models/StoryPart";
import User from "@/models/User";

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

export async function UpdateStory(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return { success: false, message: "Unauthorized" };
  }

  const author = session.user.id;

  // Extract fields from the form
  const storyId = formData.get("storyId") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const language = formData.get("language") as string;
  const visibility = formData.get("visibility") as "public" | "private";
  const copyright = parseInt(formData.get("copyright") as string, 10) as
    | 1
    | 2
    | 3;
  try {
    await connectToDatabase();

    const existingStory = await Story.findById(storyId);

    if (!existingStory) {
      return { success: false, message: "Story not found" };
    }

    // Only allow update if user is the author
    if (existingStory.author.toString() !== author) {
      return { success: false, message: "Permission denied" };
    }

    // Update fields
    existingStory.title = title;
    existingStory.description = description;
    existingStory.category = category;
    existingStory.language = language;
    existingStory.visibility = visibility;
    existingStory.copyright = copyright;

    await existingStory.save();

    return {
      success: true,
      message: "Story updated successfully",
    };
  } catch (error) {
    console.error("Error updating story:", error);
    return {
      success: false,
      message: "Failed to update story. Please try again later.",
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
        .populate("parts")
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

export async function searchByAuthorName(authorName: string, page: number = 1) {
  try {
    // Ensure valid author name is provided
    if (!authorName) {
      return { success: false, message: "Author name is required" };
    }

    // Search for user by author name (case-insensitive)
    const user = await User.findOne({
      name: { $regex: new RegExp(authorName, "i") },
    }).lean();

    if (!user) {
      return { success: false, message: "Author not found" };
    }

    const authorId = user._id;
    const limit = 10;
    const skip = (page - 1) * limit;

    await connectToDatabase();

    const [stories, totalCount] = await Promise.all([
      Story.find({ author: authorId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(), // No population of parts, just get the stories
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
    console.error("Error fetching stories by author name:", error);
    return {
      success: false,
      message: "Failed to fetch stories by author name",
    };
  }
}

export async function searchByStoryTitle(
  title: string,
  page: number = 1,
  filters: { partsLength?: number; createdAt?: string; category?: string } = {}
) {
  try {
    // Ensure valid title is provided
    if (!title) {
      return { success: false, message: "Story title is required" };
    }

    // Initialize filters
    let filterQuery: any = {
      title: { $regex: new RegExp(title, "i") },
    };

    // Apply parts length filter if provided
    if (filters.partsLength) {
      filterQuery["parts"] = { $size: filters.partsLength };
    }

    // Apply createdAt filter if provided
    if (filters.createdAt) {
      const dateRange = new Date(filters.createdAt);
      filterQuery["createdAt"] = { $gte: dateRange }; // Filter stories created after the given date
    }

    // Apply category filter if provided
    if (filters.category) {
      filterQuery["category"] = filters.category;
    }

    // Connect to the database
    await connectToDatabase();

    const limit = 10;
    const skip = (page - 1) * limit;

    const [stories, totalCount] = await Promise.all([
      Story.find(filterQuery)
        .sort({ createdAt: -1 }) // Sorting by most recent stories
        .skip(skip)
        .limit(limit)
        .lean(), // No population for parts, just get the stories
      Story.countDocuments(filterQuery),
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
    console.error("Error fetching stories by title:", error);
    return {
      success: false,
      message: "Failed to fetch stories by title",
    };
  }
}

export async function FetchStoriesByCategoryName(
  page: number = 1,
  categoryName?: string,
  limit: number = 10 // Default value for limit
) {
  try {
    const skip = (page - 1) * limit;

    await connectToDatabase();

    const filter: any = categoryName ? { category: categoryName } : {};

    const [stories, totalCount] = await Promise.all([
      Story.find(filter)
        .sort({ createdAt: -1 })
        .select(
          "_id title visibility description coverImage createdAt updatedAt language"
        )
        .skip(skip)
        .limit(limit)
        .lean(),
      Story.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      success: true,
      stories: stories || [],
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

    // Fetch the story
    const story = await Story.findOne({
      _id: storyId,
      author: session.user.id,
    });

    if (!story) {
      return { success: false, message: "Story not found or unauthorized." };
    }

    // Delete cover image from Cloudinary if exists
    if (story.coverImage) {
      const publicId = await getCloudinaryResource(story.coverImage);

      if (publicId) {
        const destroyResult = await cloudinary.uploader.destroy(publicId);

        if (!destroyResult.result || destroyResult.result !== "ok") {
          return {
            success: false,
            message: "Failed to delete the image from Cloudinary.",
          };
        }
      }
    }

    // Delete the story
    await Story.deleteOne({ _id: storyId });

    // Delete all related parts of the story
    await StoryPart.deleteMany({ storyId });

    return {
      success: true,
      message: "Story and its parts deleted successfully.",
    };
  } catch (error) {
    console.error("Delete story error:", error);
    return { success: false, message: "An error occurred." };
  }
}

export async function FetchStoryById(storyId: string) {
  try {
    // Ensure the storyId is a valid ObjectId

    await connectToDatabase();

    // Fetch the story by its ID and populate the 'parts' field
    const story = await Story.findById(storyId)
      .select(
        "_id title visibility views likes description coverImage createdAt updatedAt language parts"
      )
      .populate("parts") // Populating the 'parts' field with full details

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

export async function FetchStoryByIdWithoutParts(storyId: string) {
  try {
    // Ensure the storyId is a valid ObjectId

    await connectToDatabase();

    // Fetch the story by its ID and populate the 'parts' field
    const story = await Story.findById(storyId).lean();

    if (!story) {
      return {
        success: false,
        message: "Story not found",
      };
    }

    return {
      success: true,
      story,
    };
  } catch (error) {
    console.error("Error fetching story by ID:", error);
    return {
      success: false,
      message: "Failed to fetch story by ID",
    };
  }
}
