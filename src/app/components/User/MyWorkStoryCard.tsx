"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MessageSquare, Star, ChevronDown } from "lucide-react";
import Link from "next/link";
import { StoryType } from "@/types/Story";
import DeleteStoryDialog from "./DeleteStoryDialog";
import { createStoryPart } from "@/app/(acttion)/StoryPart/action";
import { useRouter } from "next/navigation";
interface MyWorkStoryCardProps {
  story: StoryType;
}

const MyWorkStoryCard: React.FC<MyWorkStoryCardProps> = ({ story }) => {
  const router = useRouter();

  const handleCreateStoryPart = async (e: React.FormEvent) => {
    e.preventDefault();

    const content = " ";
    const visibility = "public";

    const result = await createStoryPart({
      storyId: story._id,
      title: "Untitled Part",
      content,
      visibility,
    });

    if (result.success) {
      router.push(`/CreateStoryPart/${story._id}/${result.data?._id}`);
    } else {
      console.error("❌ Failed to create story part:", result.error);
    }
  };

  return (
    <Card className="flex flex-col md:flex-row items-center gap-4 mb-4 p-4 border border-gray-200 shadow-sm">
      {/* Story Image */}
      <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-32 md:h-44 overflow-hidden rounded-md">
        <img
          src={story.coverImage || "https://placehold.co/200x300?text=No+Image"}
          alt={story.title}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Story Info */}
      <CardContent className="flex flex-col md:flex-1 justify-between md:flex-row gap-4 md:gap-2 w-full p-0">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">
            <Link href={`/myworks/${story._id}`} className="hover:underline">
              {story.title || "Untitled Story"}
            </Link>
          </h3>
          <div className="text-sm text-gray-500">
            {story.parts?.length || 0} Draft
          </div>
          <div className="text-xs text-gray-400">
            Updated {new Date(story.updatedAt).toLocaleString()}
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Eye size={14} /> <span>{story.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={14} /> <span>{story.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare size={14} /> <span>0</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:gap-2 gap-2 sm:mt-0 mt-4 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center p-4 h-7 border-none outline-none gap-1 w-full text-white sm:w-auto bg-orange-500 hover:bg-orange-600 rounded-md">
              <div className="text-sm">Continue Writing</div>
              <ChevronDown size={14} />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-80 p-2">
              {story.parts?.map((part, idx) => (
                <Link
                  key={idx}
                  href={`/CreateStoryPart/${story._id}/${part._id}`}
                >
                  <DropdownMenuItem className="flex items-center gap-2">
                    <span>{part.title || `Chapter ${idx + 1}`}</span>
                  </DropdownMenuItem>
                </Link>
              ))}

              {/* Form submission for creating a story part */}
              <form onSubmit={handleCreateStoryPart}>
                <Button
                  className="mt-3 w-full bg-orange-500 hover:bg-orange-600"
                  type="submit"
                >
                  New
                </Button>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>

          <DeleteStoryDialog storyId={story._id.toString()} />
        </div>
      </CardContent>
    </Card>
  );
};

export default MyWorkStoryCard;
