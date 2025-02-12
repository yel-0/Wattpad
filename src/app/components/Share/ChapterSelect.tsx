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
  number: number;
  title: string;
  url: string;
}

const chapters: Chapter[] = [
  { number: 1, title: "Chapter 1.", url: "#chapter-1" },
  { number: 2, title: "Chapter 2.", url: "#chapter-2" },
  { number: 3, title: "Chapter 3.", url: "#chapter-3" },
  { number: 4, title: "Chapter 4.", url: "#chapter-4" },
  { number: 5, title: "Chapter 5.", url: "#chapter-5" },
  { number: 6, title: "Chapter 6.", url: "#chapter-6" },
  { number: 7, title: "Chapter 7.", url: "#chapter-7" },
  { number: 8, title: "Chapter 8.", url: "#chapter-8" },
  { number: 9, title: "Chapter 9.", url: "#chapter-9" },
  { number: 10, title: "Chapter 10.", url: "#chapter-10" },
  { number: 11, title: "Chapter 11.", url: "#chapter-11" },
  { number: 12, title: "Chapter 12.", url: "#chapter-12" },
  { number: 13, title: "Chapter 13.", url: "#chapter-13" },
  { number: 14, title: "Chapter 14.", url: "#chapter-14" },
  { number: 15, title: "Chapter 15.", url: "#chapter-15" },
  { number: 16, title: "Chapter 16.", url: "#chapter-16" },
  { number: 17, title: "Chapter 17.", url: "#chapter-17" },
  { number: 18, title: "Chapter 18.", url: "#chapter-18" },
  { number: 19, title: "Chapter 19.", url: "#chapter-19" },
  { number: 20, title: "Chapter 20.", url: "#chapter-20" },
];

export function ChapterSelect() {
  const [currentChapter, setCurrentChapter] = useState(chapters[2]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 p-3 bg-white border rounded-md shadow-sm hover:bg-gray-50">
        <img
          src="https://img.wattpad.com/cover/765329-64-k688944.jpg"
          alt="Book cover"
          className="w-8 h-8 object-cover rounded"
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
          {chapters.map((chapter) => (
            <DropdownMenuItem
              key={chapter.number}
              onSelect={() => setCurrentChapter(chapter)}
              className={`flex items-center ${
                currentChapter.number === chapter.number ? "bg-orange-100" : ""
              }`}
            >
              <a href={chapter.url} className="flex-1">
                <div className="text-sm">{chapter.title}</div>
              </a>
            </DropdownMenuItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
