"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import { UpdateStory } from "@/app/(acttion)/Story/action";

export default function PageClient({ story }: { story: any }) {
  const [title, setTitle] = useState<string>(story.title || "Untitled Story");
  const [description, setDescription] = useState<string>(
    story.description || ""
  );
  const [category, setCategory] = useState<string>(story.category || "");
  const [language, setLanguage] = useState<string>(story.language || "English");
  const [copyright, setCopyright] = useState<string>(
    story.copyright.toString() || "1"
  );
  const [coverImage, setCoverImage] = useState<string>(story.coverImage || "");
  const [visibility, setVisibility] = useState<"public" | "private">(
    story.visibility || "public"
  );

  const handleUpdateStory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("storyId", story._id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("language", language);
    formData.append("copyright", copyright);
    formData.append("visibility", visibility);

    const result = await UpdateStory(formData);
    alert(result.message);
  };

  return (
    <form onSubmit={handleUpdateStory} className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3">
          <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden">
            {coverImage ? (
              <Image
                src={coverImage}
                alt="Story cover"
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Upload className="h-12 w-12 text-muted-foreground mb-2" />

                <label className="cursor-pointer text-sm text-center w-full">
                  Upload Cover
                  <input
                    id="image"
                    type="file"
                    name="image"
                    className="hidden"
                    // onChange={handleImageUpload}
                    required
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-8 lg:col-start-5">
          <div className="space-y-8">
            <div>
              <Button
                variant="ghost"
                className="w-full justify-start text-lg font-semibold px-0"
              >
                Story Details
              </Button>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <input
                  type="text"
                  className="p-2 border rounded-md w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Write your story description..."
                  className="min-h-[100px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="action">Action</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="chickLit">ChickLit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Language</label>
                  <Select onValueChange={setLanguage} value={language}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Español">Español</SelectItem>
                      <SelectItem value="Français">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Copyright</label>
                  <Select onValueChange={setCopyright} value={copyright}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">All Rights Reserved</SelectItem>
                      <SelectItem value="2">Public Domain</SelectItem>
                      <SelectItem value="3">
                        Creative Commons Attribution
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Visibility</label>
                <Select
                  onValueChange={(value: "public" | "private") =>
                    setVisibility(value)
                  }
                  defaultValue={visibility}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit">Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
