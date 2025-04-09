"use server";

import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";

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
