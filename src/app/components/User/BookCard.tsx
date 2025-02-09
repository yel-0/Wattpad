import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface BookCardProps {
  imageUrl: string;
  title: string;
  altText: string;
}

export default function BookCard({ imageUrl, title, altText }: BookCardProps) {
  return (
    <Card className="overflow-hidden w-full">
      <div className="relative aspect-[2/3] w-full">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={altText}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <CardContent className="p-2 h-[50px] flex items-center">
        <h2 className="text-sm font-medium line-clamp-2 text-center">
          {title.length > 15 ? title.slice(0, 15) + "..." : title}
        </h2>
      </CardContent>
    </Card>
  );
}
