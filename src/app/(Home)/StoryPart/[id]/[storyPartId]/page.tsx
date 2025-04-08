import { Heart, Share2, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChapterSelect } from "@/app/components/Share/ChapterSelect";
import { getStoryAndPart } from "@/app/(acttion)/StoryPart/action";
import DisplayData from "@/app/components/User/DisplayData";

export default async function StoryReader({
  params,
}: {
  params: Promise<{ id: string; storyPartId: string }>;
}) {
  const storyId = (await params).id;
  const storyPartId = (await params).storyPartId;

  const data = await getStoryAndPart(storyId, storyPartId);

  return (
    <div className="min-h-screen bg-white">
      <div className="relative px-4 border-b flex items-center justify-between gap-4 w-full">
        {/* Chapter Select */}
        <ChapterSelect chapters={data?.story.parts || []} />
        {/* Buttons + Vote with Star Icon */}
        <div className="flex gap-4">
          <Button variant="outline" className="px-4 py-2">
            +
          </Button>
          <Button variant="default" className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            Vote
          </Button>
        </div>
      </div>

      {/* Chapter Content */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-6">Chapter 3.</h2>

        <div className="flex items-center justify-center gap-8 mb-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span>👁️</span>
            <span>1.4M</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⭐</span>
            <span>70.7K</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💬</span>
            <span>41K</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Author Info */}
          <div className="flex items-center gap-4 mb-8">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1738683987582-b52d371d2782?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D" />
              <AvatarFallback>HI</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">by HonorInTheRain</div>
              <Button variant="ghost" size="sm" className="text-blue-600">
                Follow
              </Button>
            </div>
            <div className="ml-auto flex gap-2">
              <Button variant="ghost" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Story Text */}
          <div className="prose max-w-none  text-gray-800 leading-relaxed">
            <DisplayData content={data?.part.content} />
          </div>
        </div>
      </div>
    </div>
  );
}
