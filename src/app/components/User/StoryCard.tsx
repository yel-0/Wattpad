import { Eye } from "lucide-react";

interface StoryCardProps {
  imageUrl: string;
  title: string;
  description: string;
  reads: number;
  isComplete: boolean;
}

export default function StoryCard({
  imageUrl,
  title,
  description,
  reads,
  isComplete,
}: StoryCardProps) {
  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-lg h-full">
      <div className="w-full sm:w-1/3 h-48 sm:h-auto">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full sm:w-2/3 p-4 flex flex-col justify-between">
        <div>
          <h5 className="text-lg  select-none cursor-pointer font-semibold mb-2 hover:text-orange-500 transition-colors duration-200">
            {title}
          </h5>
          <p className="text-sm text-gray-600 line-clamp-3 mb-4">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <Eye className="w-4 h-4 mr-1" />
            <span>{reads.toLocaleString()} Reads</span>
          </div>
          <span className="text-sm text-gray-500">
            {isComplete ? "Complete" : "Ongoing"}
          </span>
        </div>
      </div>
    </div>
  );
}
