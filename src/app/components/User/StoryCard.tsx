import { Eye } from "lucide-react";
import { StoryType } from "@/types/Story";
import Link from "next/link";

export default function StoryCard({ story }: { story: StoryType }) {
  return (
    <div className="flex  flex-col sm:flex-row bg-white rounded-xl overflow-hidden shadow-lg h-full">
      <div className="w-full sm:w-1/3 h-48 sm:h-auto">
        <img
          src={story.coverImage || "/placeholder.svg"}
          alt={story.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full sm:w-2/3 p-4 flex flex-col justify-between">
        <div>
          <Link href={`/StoryDetailPage/${story._id}`}>
            <h5 className="text-lg select-none cursor-pointer font-semibold mb-2 hover:text-orange-500 transition-colors duration-200">
              {story.title}
            </h5>
          </Link>
          <p className="text-sm text-gray-600 line-clamp-3 mb-4">
            {story.description || "No description available."}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <Eye className="w-4 h-4 mr-1" />
            <span>{story.views?.toLocaleString() || 0} Reads</span>
          </div>
          <span className="text-sm text-gray-500">
            {story.visibility === "private" ? "Private" : "Public"}
          </span>
        </div>
      </div>
    </div>
  );
}
