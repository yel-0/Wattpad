"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import Link from "next/link";

const FollowUserCard = () => {
  const [isFollowing, setIsFollowing] = useState(true);

  return (
    <article className="bg-white text-black rounded-lg shadow-lg w-full max-w-sm">
      {/* Background Image */}
      <div
        className="h-24 bg-cover bg-center rounded-t-lg"
        style={{
          backgroundImage:
            "url('https://img.wattpad.com/userbgs/Wattpad.360.54970.jpg')",
        }}
      ></div>

      {/* Avatar & Name */}
      <div className="flex flex-col items-center -mt-10">
        <Link href="/user/Wattpad">
          <Avatar className="w-20 h-20 border-4 border-gray-800">
            <AvatarImage
              src="https://img.wattpad.com/useravatar/Wattpad.128.838617.jpg"
              alt="Wattpad"
            />
          </Avatar>
        </Link>
        <h5 className="mt-2 text-lg font-semibold">
          <Link href="/user/Wattpad" className="hover:text-orange-500">
            Wattpad
          </Link>
        </h5>
        <small className="text-gray-400">@Wattpad</small>
      </div>

      {/* Follow Button */}
      <div className="mt-4 p-4">
        <Button
          className={`w-full ${
            isFollowing
              ? "bg-teal-500 hover:bg-teal-600"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
          onClick={() => setIsFollowing(!isFollowing)}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      </div>

      {/* Footer Stats */}
      <footer className="mt-6 flex justify-around border-t  py-4">
        <div className="text-center">
          <h5 className="text-lg font-semibold">3</h5>
          <small className="text-gray-400">Works</small>
        </div>
        <div className="text-center">
          <h5 className="text-lg font-semibold">38</h5>
          <small className="text-gray-400">Following</small>
        </div>
        <div className="text-center">
          <h5 className="text-lg font-semibold">59.8M</h5>
          <small className="text-gray-400">Followers</small>
        </div>
      </footer>
    </article>
  );
};

export default FollowUserCard;
