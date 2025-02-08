"use client";

import { useState } from "react";
import { registerUser } from "@/app/(acttion)/User/User";
export default function RegisterPage() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await registerUser(formData);
    setMessage(result.message);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border shadow-md">
      <h1 className="text-2xl font-bold mb-5">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Name:
          <input
            type="text"
            name="name"
            required
            className="border p-2 w-full"
          />
        </label>
        <label className="block">
          Email:
          <input
            type="email"
            name="email"
            required
            className="border p-2 w-full"
          />
        </label>
        <label className="block">
          Password:
          <input
            type="password"
            name="password"
            required
            className="border p-2 w-full"
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Register
        </button>
      </form>
      {message && <p className="text-red-500 mt-2">{message}</p>}
    </div>
  );
}
