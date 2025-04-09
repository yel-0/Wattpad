"use client";

import type React from "react";
import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Bold,
  Italic,
  Image,
  Video,
  MoreHorizontal,
} from "lucide-react";
import { useParams } from "next/navigation";
import {
  getStoryAndPart,
  updateStoryPart,
} from "@/app/(acttion)/StoryPart/action";
import Link from "next/link";
import router from "next/router";
import { ChapterSelect } from "../Share/ChapterSelect";
import DeleteStoryPartDialog from "./DeleteStoryPartDialog";

export default function Editor({
  data,
  storyId,
  storyPartId,
}: {
  data: any;
  storyId: string;
  storyPartId: string;
}) {
  const [title, setTitle] = useState(data.part.title);
  const [storyTitle, setStoryTitle] = useState(data.story.title);

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "border rounded-xl p-2 min-h-[300px] border-none outline-none",
      },
    },
    content: data.part.content,
  });

  const handleUpdateStory = async (e: React.FormEvent) => {
    e.preventDefault();

    const visibility = "public";

    const content = editor?.getJSON() || {};

    const result = await updateStoryPart({
      storyPartId: storyPartId,
      title: title || "Untitled Part",
      content,
      visibility,
    });

    if (result.success) {
      // router.push(`/CreateStoryPart/${storyId}/${result.data?._id}`);
      alert("success");
    } else {
      console.error("❌ Failed to create story part:", result.error);
      alert("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <ChapterSelect
            chapters={data?.story?.parts || []}
            story={data?.story}
            view="create"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button>Save</Button>
          <Button variant="outline">Preview</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DeleteStoryPartDialog storyPartId={storyPartId} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      <main className="container  mx-auto mt-8 space-y-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl font-bold"
          placeholder="Enter your story title"
        />

        <div className="border rounded-md p-2">
          {/* Toolbar */}
          <div className="flex space-x-2 mb-2">
            <Button
              variant="removeHover"
              size="icon"
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={editor?.isActive("bold") ? "bg-black text-white" : ""}
            >
              <Bold className="h-4 w-4" />
            </Button>

            <Button
              variant="removeHover"
              size="icon"
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={
                editor?.isActive("italic") ? "bg-black text-white" : ""
              }
            >
              <Italic className="h-4 w-4" />
            </Button>
          </div>

          {/* Tiptap Editor */}
          <div className="border rounded-md   min-h-[400px]">
            <EditorContent editor={editor} />
          </div>
        </div>
      </main>

      <Popover>
        <PopoverTrigger asChild>
          <Button className="fixed bottom-4 right-4" variant="outline">
            Publish
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-2">
            <h3 className="font-medium">Publish your story</h3>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to publish this part?
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <form onSubmit={handleUpdateStory}>
                <Button type="submit">Publish</Button>
              </form>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
