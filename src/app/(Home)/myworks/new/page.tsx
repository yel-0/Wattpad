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
import { Switch } from "@/components/ui/switch";
import { Info, Plus, Upload } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Character {
  id: number;
  name: string;
}

export default function StoryEditor() {
  const [title, setTitle] = useState<string>("Untitled Story");
  const [description, setDescription] = useState<string>("");
  const [characters, setCharacters] = useState<Character[]>([
    { id: 1, name: "" },
  ]);
  const [category, setCategory] = useState<string>("");
  const [language, setLanguage] = useState<string>("1");
  const [copyright, setCopyright] = useState<string>("1");
  const [isMature, setIsMature] = useState<boolean>(false);
  const [coverImage, setCoverImage] = useState<string>("");

  const addCharacter = () => {
    setCharacters([...characters, { id: Date.now(), name: "" }]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      title,
      description,
      characters,
      category,
      language,
      copyright,
      isMature,
      coverImage,
    };
    console.log("Form Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto px-4 py-8">
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary">Add a cover</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <label className="cursor-pointer w-full">
                        Upload Cover
                        <input
                          type="file"
                          className="hidden"
                          accept="image/jpeg, image/png, image/gif"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Create Cover</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                {characters.map((char) => (
                  <div key={char.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Name"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={char.name}
                      onChange={(e) => {
                        const newCharacters = [...characters];
                        const index = newCharacters.findIndex(
                          (c) => c.id === char.id
                        );
                        newCharacters[index].name = e.target.value;
                        setCharacters(newCharacters);
                      }}
                    />
                    <Button size="icon" variant="ghost" onClick={addCharacter}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="14">Action</SelectItem>
                    <SelectItem value="11">Adventure</SelectItem>
                    <SelectItem value="24">ChickLit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Language</label>
                  <Select onValueChange={setLanguage} defaultValue={language}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">English</SelectItem>
                      <SelectItem value="5">Español</SelectItem>
                      <SelectItem value="2">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Copyright</label>
                  <Select onValueChange={setCopyright} defaultValue={copyright}>
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

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Mature Content</label>
                <Switch checked={isMature} onCheckedChange={setIsMature} />
              </div>

              <Button type="submit">Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
