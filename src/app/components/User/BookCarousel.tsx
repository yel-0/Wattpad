"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BookCard from "./BookCard";
import { StoryType } from "@/types/Story";

interface BookCarouselProps {
  books: StoryType[];
}

export function BookCarousel({ books }: BookCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full relative "
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {books.map((book, index) => (
          <CarouselItem
            key={index}
            className="pl-2 md:pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 snap-start"
          >
            <BookCard {...book} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
      <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
    </Carousel>
  );
}
