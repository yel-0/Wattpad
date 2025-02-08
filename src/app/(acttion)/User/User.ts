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
