import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StoryProps {
  imageUrl: string;
  title: string;
  altText: string;
  reads: string;
  description: string;
}

export default function StoryCard({
  imageUrl,
  title,
  altText,
  reads,
  description,
}: StoryProps) {
  return (
    <div className="w-full flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-lg">
      {/* Story Image */}
      <div className="w-full md:w-1/3">
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-64 md:h-full object-cover"
        />
      </div>

      {/* Story Info */}
      <div className="w-full md:w-2/3 p-6 flex flex-col bg-white rounded-xl shadow-md justify-between">
        <div className="text-xl md:text-2xl lg:text-3xl cursor-pointer font-semibold text-gray-900 hover:text-orange-600 transition duration-200">
          {title}
        </div>

        <p className="text-sm text-gray-700 mt-3 line-clamp-4">{description}</p>
        <div className="flex flex-col md:flex-row items-center justify-between mt-5 space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Eye className="w-4 h-4 mr-2" />
            <span>{reads} Reads</span>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-sm rounded-md transition duration-200 w-full md:w-auto">
            Read Now
          </Button>
        </div>
      </div>
    </div>
  );
}
