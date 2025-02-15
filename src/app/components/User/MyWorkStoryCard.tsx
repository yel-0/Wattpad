import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  MessageSquare,
  Star,
  Pencil,
  Trash2,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

const MyWorkStoryCard = () => {
  return (
    <Card className="flex flex-col md:flex-row items-center gap-4 mb-4 p-4 border border-gray-200 shadow-sm">
      {/* Story Image */}
      <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-32 md:h-44 overflow-hidden rounded-md">
        <img
          src="https://images.unsplash.com/photo-1739192415587-f846fb6c731c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
          alt="Untitled Story"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Story Info */}
      <CardContent className="flex flex-col md:flex-1 justify-between md:flex-row gap-4 md:gap-2 w-full p-0">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">
            <Link
              href="/myworks/362472431-untitled-story"
              className="hover:underline"
            >
              Untitled Story
            </Link>
          </h3>
          <div className="text-sm text-gray-500">1 Draft</div>
          <div className="text-xs text-gray-400">
            Updated Feb 09, 2024 09:03AM
          </div>

          {/* Meta Data */}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Eye size={14} /> <span>0</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={14} /> <span>0</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare size={14} /> <span>0</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:gap-2 gap-2 sm:mt-0 mt-4 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center p-4 h-7 border-none outline-none gap-1 w-full text-white sm:w-auto bg-orange-500 hover:bg-orange-600 rounded-md">
              <div className="text-sm">Continue Writing</div>{" "}
              <ChevronDown size={14} />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-80 p-2">
              {/* Example Items */}
              <DropdownMenuItem className="flex items-center gap-2">
                <span>Chapter 1</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <span>Chapter 2</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <span>Chapter 3</span>
              </DropdownMenuItem>
              <Link href="/CreateStoryPart">
                <Button className="mt-3 w-full bg-orange-500 hover:bg-orange-600">
                  New
                </Button>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 w-full sm:w-auto"
          >
            <Trash2 size={14} /> Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyWorkStoryCard;
