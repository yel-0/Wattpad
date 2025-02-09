"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import StoryCard from "./StoryCard";

interface Story {
  imageUrl: string;
  title: string;
  altText: string;
  reads: string;
  description: string;
}

interface StoryCarouselProps {
  stories: Story[];
}

export function StoryCarousel({ stories }: StoryCarouselProps) {
  return (
    <Carousel opts={{ align: "start" }} className="w-full bg-white relative">
      <CarouselContent className="-ml-2 md:-ml-4 bg-white">
        {stories.map((story, index) => (
          <CarouselItem
            key={index}
            className="pl-2 md:pl-4 bg-white basis-1/2 lg:basis-1/2 xl:basis-1/2 snap-start"
          >
            <StoryCard {...story} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
      <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
    </Carousel>
  );
}
