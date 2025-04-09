"use client";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const AuthUserMobile = () => {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="flex gap-4 flex-col justify-center items-center">
        <p>Welcome, {session.user.name}</p>
        <Button className="w-full" asChild>
          <a href={`/Profile/${session.user.name}`}>Go to Profile</a>
        </Button>
        <Button
          variant={"destructive"}
          className="w-full"
          onClick={() => signOut()}
        >
          Sign out
        </Button>
      </div>
    );
  } else {
    return (
      <div className="flex gap-2">
        <Button asChild variant="outline" size="sm">
          <a href="/login">Login</a>
        </Button>
        <Button asChild size="sm">
          <a href="/register">Register</a>
        </Button>
      </div>
    );
  }
};

export default AuthUserMobile;
