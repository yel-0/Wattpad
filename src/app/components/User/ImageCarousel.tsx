import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";

const ImageCarousel = () => {
  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <Carousel className="relative">
        {/* Previous Button */}

        {/* Carousel Content */}
        <CarouselContent className="flex space-x-4">
          <CarouselItem>
            <div className="text-lg sm:text-xl font-semibold text-black">
              She's hiding a secret 🤫
            </div>

            {/* Subheader */}
            <div className="my-2 text-sm sm:text-base  text-black opacity-90">
              Dive into must-read sports romances everyone's talking about
            </div>
            <Image
              src="https://ma.wattpad.com/stbc_series_hfc_desktop_v4.jpg"
              alt="Image 1"
              layout="responsive"
              width={1200} // Adjust the width for image scaling
              height={340} // Adjust the height based on the aspect ratio
              className="rounded-lg shadow-lg"
            />
          </CarouselItem>
          <CarouselItem>
            <div className="text-lg sm:text-xl font-semibold text-black">
              She's hiding a secret 🤫
            </div>

            {/* Subheader */}
            <div className="my-2 text-sm sm:text-base  text-black opacity-90">
              Dive into must-read sports romances everyone's talking about
            </div>
            <Image
              src="https://ma.wattpad.com/black-history-month-2025-campaign_hfc-1_desktop_v1.png"
              alt="Image 2"
              layout="responsive"
              width={1200}
              height={340}
              className="rounded-lg shadow-lg"
            />
          </CarouselItem>
          <CarouselItem>
            <div className="text-lg sm:text-xl font-semibold text-black">
              She's hiding a secret 🤫
            </div>

            {/* Subheader */}
            <div className="my-2 text-sm sm:text-base  text-black opacity-90">
              Dive into must-read sports romances everyone's talking about
            </div>
            <Image
              src="https://ma.wattpad.com/qb-bad-boy-and-me-2025_hfc_desktop.png"
              alt="Image 3"
              layout="responsive"
              width={1200}
              height={340}
              className="rounded-lg shadow-lg"
            />
          </CarouselItem>
        </CarouselContent>

        {/* Next Button */}
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10" />

        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10" />
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
