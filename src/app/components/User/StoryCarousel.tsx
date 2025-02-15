"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import StoryCard from "./StoryCard";
interface Story {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  reads: number;
  isComplete: boolean;
}

const stories: Story[] = [
  {
    id: "1",
    imageUrl:
      "https://images.unsplash.com/photo-1736604860264-e2f21df57a89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
    title: "Only You",
    description:
      "When Charlotte agrees to fake date bad boy Mason to make her best friend and secret crush, Ben, jealous, she thinks it will be a simple arrangement...",
    reads: 7453507,
    isComplete: true,
  },
  {
    id: "2",
    imageUrl:
      "https://images.unsplash.com/photo-1738071545459-e19435ae37e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
    title: "Buried Roses",
    description:
      "Grace, the illegitimate daughter of Edward IV, finds her life turned upside down when he dies and her family flees into sanctuary when her uncle takes power...",
    reads: 51423,
    isComplete: true,
  },
  // Add more stories as needed to test carousel functionality
  {
    id: "3",
    imageUrl:
      "https://images.unsplash.com/photo-1736604860264-e2f21df57a89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
    title: "Lady Mutiny",
    description:
      "Assassin Lilia Cortova was given a simple task: kill a rich lord at a festival. The last thing she expected was to be betrayed by the leader of her own Guild in the process...",
    reads: 78184,
    isComplete: true,
  },
  {
    id: "4",
    imageUrl:
      "https://images.unsplash.com/photo-1738071545459-e19435ae37e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
    title: "Love in his Lie",
    description:
      "What happens when your casual crush accidentally turns into your fiancé...without you even knowing?",
    reads: 81329,
    isComplete: true,
  },
];

export function StoryCarousel() {
  return (
    <div className="w-full my-10 bg-white">
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h4 className="text-sm text-gray-600 mb-1">
            Free for subscribers this month
          </h4>
          <h3 className="text-xl sm:text-2xl font-bold flex items-center">
            Premium Picks
            <span className="ml-2 text-sm font-normal flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-1" />
              13d 7h
            </span>
          </h3>
        </div>
        <Button variant="link" className="text-orange-500 p-0 h-auto">
          See all
          <svg
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full relative"
      >
        <CarouselContent>
          {Array.from({ length: Math.ceil(stories.length / 2) }).map(
            (_, index) => (
              <CarouselItem key={index} className="pt-1 ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stories.slice(index * 2, index * 2 + 2).map((story) => (
                    <StoryCard key={story.id} {...story} />
                  ))}
                </div>
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
      </Carousel>
    </div>
  );
}
