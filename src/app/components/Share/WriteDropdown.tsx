"use client";
import Link from "next/link";
import { Edit, ChevronDown, Plus, FileText } from "lucide-react"; // Import additional icons

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function WriteDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="flex  items-center gap-2">
          <Edit className="h-4 w-4" />
          Write
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem asChild>
          <Link href="/myworks/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create a new story
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/myworks" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            My Stories
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
