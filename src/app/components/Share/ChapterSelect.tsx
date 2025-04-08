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

interface Chapter {
  _id: string;
  title: string;
  content?: string; // Make content optional
  visibility?: string; // Make visibility optional
  createdAt?: string;
}

interface ChapterSelectProps {
  chapters: Chapter[]; // Array of chapters
}

export function ChapterSelect({ chapters }: ChapterSelectProps) {
  const [currentChapter, setCurrentChapter] = useState<Chapter | undefined>(
    undefined
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 p-3 bg-white border rounded-md shadow-sm hover:bg-gray-50">
        <img
          src="https://img.wattpad.com/cover/765329-64-k688944.jpg"
          alt="Book cover"
          className="w-8 h-10 object-cover rounded"
        />
        <div className="text-left">
          <h2 className="text-sm font-semibold">
            In 27 Days (Watty Award Winner 2012)
          </h2>
          <p className="text-xs text-gray-500">by HonorInTheRain</p>
        </div>
        <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <div className="p-2 text-center border-b">
          <h6 className="font-semibold">
            In 27 Days (Watty Award Winner 2012)
          </h6>
          <small className="text-gray-500">Table of contents</small>
        </div>
        <ScrollArea className="h-72">
          {chapters.map((chapter: Chapter) => (
            <DropdownMenuItem
              key={chapter._id} // Use unique identifier (_id) as the key
              onSelect={() => setCurrentChapter(chapter)}
              className={`flex items-center ${
                currentChapter?._id === chapter._id ? "bg-orange-100" : ""
              }`}
            >
              <div className="text-sm">{chapter.title}</div>
            </DropdownMenuItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
