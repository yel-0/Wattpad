"use server";

import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { v2 as cloudinary } from "cloudinary";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { success: false, message: "All fields are required!" };
  }

  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User already exists!" };
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    return { success: true, message: "Registration successful!" };
  } catch (error) {
    return { success: false, message: "Something went wrong." };
  }
}

export async function searchUsersByName(name: string, limit: number = 10) {
  if (!name || name.trim() === "") {
    return { success: false, message: "Name is required." };
  }

  try {
    await connectToDatabase();

    const users = await User.find({
      name: { $regex: new RegExp(name, "i") }, // case-insensitive search
    })
      .limit(limit)
      .lean();

    return {
      success: true,
      users,
    };
  } catch (error) {
    console.error("Error searching users by name:", error);
    return {
      success: false,
      message: "Something went wrong while searching for users.",
    };
  }
}
export async function updateUserProfile(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return { success: false, message: "Unauthorized" };
  }

  const userId = session.user.id;
  const userName = formData.get("userName") as string;
  const profileImageFile = formData.get("profileImage") as File | null;
  const bgImageFile = formData.get("backgroundImage") as File | null;

  let profileImageUrl = "";
  let bgImageUrl = "";

  try {
    await connectToDatabase();

    // === Uploading images (if provided) ===
    async function uploadToCloudinary(
      file: File,
      tag: string
    ): Promise<string> {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              tags: [tag],
              upload_preset: "nextjs-server-actions-upload",
            },
            (error, result) => {
              if (error || !result?.secure_url) {
                reject(new Error("Image upload failed."));
              } else {
                resolve(result.secure_url);
              }
            }
          )
          .end(buffer);
      });
    }

    // Only upload the profile image if it's provided and successful
    if (profileImageFile) {
      try {
        profileImageUrl = await uploadToCloudinary(
          profileImageFile,
          "user-profile"
        );
      } catch (error) {
        return { success: false, message: "Profile image upload failed." };
      }
    }

    // Only upload the background image if it's provided and successful
    if (bgImageFile) {
      try {
        bgImageUrl = await uploadToCloudinary(bgImageFile, "user-bg");
      } catch (error) {
        return { success: false, message: "Background image upload failed." };
      }
    }

    // === Only after successful uploads, update the user ===
    const updateData: {
      userName?: string;
      profileImage?: string;
      bgImage?: string;
    } = {};

    // Include userName only if it's provided
    if (userName) {
      updateData.userName = userName;
    }

    // Include profileImageUrl and bgImageUrl if they were successfully uploaded
    if (profileImageUrl) {
      updateData.profileImage = profileImageUrl;
    }

    if (bgImageUrl) {
      updateData.bgImage = bgImageUrl;
    }

    // Update the user only if there are changes
    if (Object.keys(updateData).length > 0) {
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      });

      if (!updatedUser) {
        return { success: false, message: "User not found." };
      }

      return {
        success: true,
        message: "Profile updated successfully",
      };
    } else {
      return { success: false, message: "No changes to update." };
    }
  } catch (error) {
    console.error("Update error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update profile.",
    };
  }
}

export async function getUserByUsername(name: string) {
  if (!name) {
    return { success: false, message: "Username is required!" };
  }

  try {
    await connectToDatabase();

    const user = await User.findOne({ name }).select("-password -_id");
    if (!user) {
      return { success: false, message: "User not found." };
    }

    return { success: true, user };
  } catch (error) {
    console.error("Error fetching user by username:", error);
    return { success: false, message: "Something went wrong." };
  }
}
