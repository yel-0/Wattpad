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
import { StoryType } from "@/types/Story";

interface StoryCarouselProps {
  stories: StoryType[];
}

export function StoryCarousel({ stories }: StoryCarouselProps) {
  return (
    <div className="w-full my-10 bg-white ">
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
        className="w-full h-full relative"
      >
        <CarouselContent>
          {Array.from({ length: Math.ceil(stories.length / 2) }).map(
            (_, index) => (
              <CarouselItem key={index} className="pt-1 p-3 h-[300px] ">
                <div className="grid h-full  grid-cols-1 md:grid-cols-2 gap-4">
                  {stories.slice(index * 2, index * 2 + 2).map((story) => (
                    <StoryCard key={story._id} story={story} />
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
