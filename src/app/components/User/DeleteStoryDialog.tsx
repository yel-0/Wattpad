"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { DeleteStoryById } from "@/app/(acttion)/Story/action"; // Adjust if needed
import { revalidatePath } from "next/cache";

type DeleteStoryDialogProps = {
  storyId: string;
};

const DeleteStoryDialog = ({ storyId }: DeleteStoryDialogProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const result = await DeleteStoryById(storyId);
        if (result.success) {
          alert("Story deleted successfully.");
        } else {
          setError(result.message || "Something went wrong.");
        }
      } catch (err) {
        setError("An error occurred while deleting the story.");
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 w-full sm:w-auto"
        >
          <Trash2 size={14} /> Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleDelete}>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              story and remove its image from Cloudinary.
            </DialogDescription>

            {error && <div className="text-red-500">{error}</div>}

            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="ghost">
                Cancel
              </Button>
              <Button
                type="submit"
                variant={"destructive"}
                disabled={isPending}
              >
                {isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </DialogHeader>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteStoryDialog;
