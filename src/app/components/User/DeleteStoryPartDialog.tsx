import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteStoryPart } from "@/app/(acttion)/StoryPart/action";

const DeleteStoryPartDialog = ({ storyPartId }: { storyPartId: string }) => {
  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your delete logic her
    const result = await deleteStoryPart(storyPartId);
    alert(result.message);
  };

  return (
    <Dialog>
      <DialogTrigger className="text-sm w-full text-center text-destructive">
        Delete Part
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this part
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleDelete}>
          <DialogFooter className="mt-4 flex flex-row justify-end gap-2">
            <DialogTrigger asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogTrigger>
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteStoryPartDialog;
