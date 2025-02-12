import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Book, Clock, ThumbsUp, ListOrdered, Plus } from "lucide-react";
import Image from "next/image";

export default function StoryDetailPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8 flex justify-center">
        <div className="space-y-8 w-full md:max-w-6xl">
          {/* Book Header */}
          <div className="grid md:grid-cols-[240px_1fr] gap-8">
            <Card>
              <CardContent className="p-0">
                <Image
                  src="https://images.unsplash.com/photo-1739104627818-d9159a7daa8d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
                  alt="Book cover"
                  width={240}
                  height={360}
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">
                In 27 Days (Watty Award Winner 2012)
              </h1>

              <div className="flex gap-8">
                <div className="flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  <span>50.6M Reads</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  <span>2M Votes</span>
                </div>
                <div className="flex items-center gap-2">
                  <ListOrdered className="w-4 h-4" />
                  <span>39 Parts</span>
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

              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1738599937833-1413fe3fa64f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8" />
                  <AvatarFallback>HT</AvatarFallback>
                </Avatar>
                <span className="font-medium">HonorInTheRain</span>
              </div>
              <Badge variant="secondary">Complete</Badge>

              <p className="text-muted-foreground">
                Hadley Jamison doesn't know what to think when she hears that
                her classmate, Archer Morales, committed suicide. She didn't
                exactly know him, but that doesn't stop her from feeling like
                there was something she could have done to help him.
              </p>
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
                {[
                  { title: "Chapter 1", date: "Fri, Dec 2, 2011" },
                  { title: "Chapter 2", date: "Sat, Dec 3, 2011" },
                  { title: "Chapter 3", date: "Mon, Dec 5, 2011" },
                  { title: "Chapter 4", date: "Wed, Dec 7, 2011" },
                  { title: "Chapter 5", date: "Fri, Dec 9, 2011" },
                  { title: "Chapter 6", date: "Sun, Dec 11, 2011" },
                  { title: "Chapter 7", date: "Tue, Dec 13, 2011" },
                  { title: "Chapter 8", date: "Thu, Dec 15, 2011" },
                  { title: "Chapter 9", date: "Sat, Dec 17, 2011" },
                  { title: "Chapter 10", date: "Mon, Dec 19, 2011" },
                ].map((chapter, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 rounded-md transition-colors duration-200 hover:text-orange-400 cursor-pointer"
                  >
                    <span>{chapter.title}</span>
                    <span className="text-muted-foreground">
                      {chapter.date}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
