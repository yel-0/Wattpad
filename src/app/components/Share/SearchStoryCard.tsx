import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, ThumbsUp, BookCopy } from "lucide-react";

interface StoryCardProps {
  cover: string;
  title: string;
  description: string;
  reads: string;
  votes: string;
  parts: string;
  time: string;
  isComplete?: boolean;
}

export function SearchStoryCard({
  cover,
  title,
  description,
  reads,
  votes,
  parts,
  time,
  isComplete = false,
}: StoryCardProps) {
  return (
    <div className="flex flex-col gap-4 border-b p-4 max-w-[650px] sm:flex-row">
      <div className="mx-auto sm:mx-0">
        <Image
          src={cover || "/placeholder.svg"}
          alt={title}
          width={150}
          height={240}
          className="h-auto w-[120px] rounded object-cover sm:h-60 sm:w-[150px]"
          priority
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="text-center text-lg font-bold sm:text-left sm:text-xl">
            {title}
          </h2>
          {isComplete && (
            <Badge
              variant="secondary"
              className="mx-auto w-fit bg-teal-600 text-white sm:mx-0"
            >
              Complete
            </Badge>
          )}
        </div>
        <p className="mb-4 text-center text-sm text-gray-600 sm:text-left">
          {description}
        </p>
        <div className="mt-auto flex flex-wrap justify-center gap-3 text-xs text-gray-500 sm:justify-start sm:gap-4 sm:text-sm">
          <div className="flex items-center gap-1">
            <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
            {reads}
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
            {votes}
          </div>
          <div className="flex items-center gap-1">
            <BookCopy className="h-3 w-3 sm:h-4 sm:w-4" />
            {parts}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
            {time}
          </div>
        </div>
      </div>
    </div>
  );
}
