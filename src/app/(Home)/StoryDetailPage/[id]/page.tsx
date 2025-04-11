import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Book, Clock, ThumbsUp, ListOrdered, Plus } from "lucide-react";
import Image from "next/image";
import { FetchStoryById } from "@/app/(acttion)/Story/action";
import Link from "next/link";
import { StoryType } from "@/types/Story"; // Make sure to import the correct StoryType

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const storyId = (await params).id;

  // Fetch story data by ID
  const { story } = await FetchStoryById(storyId);

  if (!story) {
    return <div>Story not found.</div>;
  }

  // Type the story variable as StoryType
  const typedStory = story as unknown as StoryType;

  // Now you can safely use typedStory.author.name and typedStory.author.profileImage
  console.log(typedStory.author?.name); // This should work
  console.log(typedStory.author?.profileImage); // This should also work

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8 flex justify-center">
        <div className="space-y-8 w-full md:max-w-6xl">
          {/* Book Header */}
          <div className="grid md:grid-cols-[240px_1fr] h-[360px] gap-8 max-w-full">
            <div className="w-full h-full">
              <Image
                alt="Book cover"
                src={typedStory?.coverImage || "/default-image.jpg"}
                width={240}
                height={360}
                className="max-h-[360px] object-cover"
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{typedStory?.title}</h1>

              <div className="flex gap-8">
                <div className="flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  <span>{typedStory?.views || "0"} Reads</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{typedStory?.likes || "0"} Likes</span>
                </div>
                <div className="flex items-center gap-2">
                  <ListOrdered className="w-4 h-4" />
                  <span>{typedStory?.parts.length} Parts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>8h 26m</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="gap-2 bg-orange-500 hover:bg-orange-600">
                  <Book className="w-4 h-4 " />
                  Start reading
                </Button>
                <Button variant="outline" size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={
                      typedStory?.author?.profileImage ||
                      "https://default-profile-image.com"
                    }
                  />
                  <AvatarFallback>HT</AvatarFallback>
                </Avatar>
                <Link href={`/Profile/${typedStory.author?.name}`}>
                  <span className="font-medium">
                    {typedStory?.author?.name || "Unknown Author"}
                  </span>
                </Link>
              </div>
              <Badge variant="secondary">Complete</Badge>

              <p className="text-muted-foreground">{typedStory?.description}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {[
              "adventure",
              "archer",
              "city",
              "dark",
              "death",
              "drama",
              "fiction",
              "hadley",
              "havoc",
              "humor",
              "life",
              "light",
              "love",
              "new",
              "serious",
              "task",
              "teen",
              "texttospeech",
              "time",
              "vacation",
              "winter",
              "york",
            ].map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Table of Contents */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Table of contents</h2>
              <div className="space-y-4">
                {typedStory.parts && typedStory.parts.length > 0 ? (
                  typedStory.parts.map((chapter: any, index) => (
                    <Link
                      key={index}
                      href={`/StoryPart/${storyId}/${chapter._id}`}
                    >
                      <div className="flex justify-between py-2 rounded-md transition-colors duration-200 hover:text-orange-400 cursor-pointer">
                        <span>{chapter.title}</span>
                        <span className="text-muted-foreground">
                          {new Date(chapter.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div>No chapters available</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
