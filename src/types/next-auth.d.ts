import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

// Extend the `AdapterUser` type to include `isAdmin`
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    isAdmin?: boolean; // Add isAdmin here
  }

  interface JWT {
    id: string;
    email: string;
    name: string;
    isAdmin?: boolean;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      isAdmin?: boolean;
    };
  }
}
