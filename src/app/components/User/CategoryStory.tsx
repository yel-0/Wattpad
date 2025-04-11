import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

import { StoryType } from "@/types/Story";
import Link from "next/link";

export default function CategoryStory({ coverImage, title, _id }: StoryType) {
  return (
    <Card className="overflow-hidden max-w-[200px] w-full">
      <div className="relative aspect-[2/3] w-full">
        <Image
          src={coverImage || "/placeholder.svg"}
          alt={""}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <CardContent className="p-2 h-[50px] flex items-center">
        <Link href={`/StoryDetailPage/${_id}`}>
          <h2 className="text-sm font-medium line-clamp-2 text-center">
            {title.length > 15 ? title.slice(0, 15) + "..." : title}
          </h2>
        </Link>
      </CardContent>
    </Card>
  );
}
