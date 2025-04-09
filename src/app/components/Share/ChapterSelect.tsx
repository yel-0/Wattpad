"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface Chapter {
  _id: string;
  title: string;
  content?: string; // Make content optional
  visibility?: string; // Make visibility optional
  createdAt?: string;
}

import { StoryType } from "@/types/Story";

interface ChapterSelectProps {
  chapters: Chapter[]; // Array of chapters
  story?: StoryType; // The entire story object
  view: string;
}

export function ChapterSelect({ chapters, story, view }: ChapterSelectProps) {
  const [currentChapter, setCurrentChapter] = useState<Chapter | undefined>(
    undefined
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex p-3 w-[300px] items-center gap-2  bg-white border rounded-md shadow-sm hover:bg-gray-50">
        <img
          src={story?.coverImage}
          alt="Book cover"
          className="w-8 h-10 object-cover rounded"
        />
        <div className="text-left w-full">
          <h2 className="text-sm font-semibold">{story?.title}</h2>
          <p className="text-xs text-gray-500">by HonorInTheRain</p>
        </div>
        <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <div className="p-2 text-center border-b">
          <h6 className="font-semibold">{story?.title}</h6>
          <small className="text-gray-500">Table of contents</small>
        </div>
        <ScrollArea className="h-72">
          {chapters.map((chapter: Chapter) =>
            view === "create" ? (
              <Link
                href={`/CreateStoryPart/${story?._id}/${chapter._id}`}
                key={chapter._id}
              >
                <DropdownMenuItem
                  onSelect={() => setCurrentChapter(chapter)}
                  className={`flex items-center ${
                    currentChapter?._id === chapter._id ? "bg-orange-100" : ""
                  }`}
                >
                  <div className="text-sm">{chapter.title}</div>
                </DropdownMenuItem>
              </Link>
            ) : (
              <Link
                href={`/StoryPart/${story?._id}/${chapter._id}`}
                key={chapter._id}
              >
                <DropdownMenuItem
                  onSelect={() => setCurrentChapter(chapter)}
                  className={`flex items-center ${
                    currentChapter?._id === chapter._id ? "bg-orange-100" : ""
                  }`}
                >
                  <div className="text-sm">{chapter.title}</div>
                </DropdownMenuItem>
              </Link>
            )
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
