"use client";

import { Button } from "@/components/ui/button";
import MyWorkStoryCard from "../components/User/MyWorkStoryCard";

const MyWork = () => {
  return (
    <div className="min-h-screen  container max-w-2xl p-4 mx-auto">
      <div className="flex flex-row py-4 justify-between items-center">
        <h3 className="text-xl font-bold">My Stories</h3>
        <Button className="bg-orange-500 hover:bg-orange-600">
          + Add Story
        </Button>
      </div>
      <MyWorkStoryCard />
      <MyWorkStoryCard />
      <MyWorkStoryCard />
      <MyWorkStoryCard />
    </div>
  );
};

export default MyWork;
