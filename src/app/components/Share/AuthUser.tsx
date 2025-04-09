"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { LogOut, Settings, User } from "lucide-react";
import { WriteDropdown } from "./WriteDropdown";
import Link from "next/link";

const AuthUser = () => {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <div className="flex gap-4 justify-center items-center">
        <WriteDropdown />
        <DropdownMenu>
          <DropdownMenuTrigger className="bordern-none outline-none" asChild>
            <Button
              variant="ghost"
              className="relative h-12 flex items-center gap-2 px-2"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={
                    "https://images.unsplash.com/photo-1739477021967-e14dc3938e56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
                  }
                  alt={session.user.name}
                />
                <AvatarFallback>
                  {session.user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-base font-medium">
                {session.user.name.toUpperCase()}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session.user.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session.user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={`/Profile/${session.user.name}`}>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => signOut()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </DropdownMenuItem>
            {session.user.isAdmin && <DropdownMenuSeparator />}
            {session.user.isAdmin && (
              <DropdownMenuLabel>
                <Badge variant="secondary" className="ml-2">
                  Admin
                </Badge>
              </DropdownMenuLabel>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  } else {
    return (
      <div className="flex gap-2">
        <Button asChild variant="outline" size="sm">
          <a href={"/login"}>Login</a>
        </Button>
        <Button asChild size="sm">
          <a href={"/register"}>Register</a>
        </Button>
      </div>
    );
  }
};

export default AuthUser;
