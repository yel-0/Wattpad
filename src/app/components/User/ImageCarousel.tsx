"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const ImageCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const slides = [
    {
      text: "She's hiding a secret 🤫",
      subtext: "Dive into must-read sports romances everyone's talking about",
      image: "https://ma.wattpad.com/stbc_series_hfc_desktop_v4.jpg",
    },
    {
      text: "Black History Month 2025",
      subtext: "Celebrating powerful stories from Black voices",
      image:
        "https://ma.wattpad.com/black-history-month-2025-campaign_hfc-1_desktop_v1.png",
    },
    {
      text: "QB Bad Boy & Me",
      subtext: "A football star and a dancer—what could go wrong?",
      image: "https://ma.wattpad.com/qb-bad-boy-and-me-2025_hfc_desktop.png",
    },
  ];

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <Carousel setApi={setApi} className="relative">
        <CarouselContent className="flex space-x-4">
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="text-lg sm:text-xl font-semibold text-black">
                {slide.text}
              </div>
              <div className="my-2 text-sm sm:text-base text-black opacity-90">
                {slide.subtext}
              </div>
              <Image
                src={slide.image}
                alt={`Image ${index + 1}`}
                layout="responsive"
                width={1200}
                height={340}
                className="rounded-lg shadow-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation buttons */}
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10" />

        {/* Pagination Dots */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn("h-2.5 w-2.5 rounded-full border-2 transition", {
                "border-primary bg-primary": current === index + 1,
                "border-gray-400": current !== index + 1,
              })}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
