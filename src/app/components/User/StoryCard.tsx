import { Eye } from "lucide-react";

export default function StoryCard() {
  return (
    <div className="w-full  flex rounded-2xl overflow-hidden shadow-xl bg-white">
      {/* Image on the left */}
      <a href="https://www.wattpad.com/story/94569890" className="w-1/3">
        <img
          src="https://img.wattpad.com/cover/94569890-256-k537385.jpg"
          alt="Only You Cover"
          className="w-full h-full object-cover"
        />
      </a>

      {/* Story details on the right */}
      <div className="w-2/3 flex flex-col p-5">
        <a
          href="https://www.wattpad.com/story/94569890"
          className="text-lg font-semibold text-gray-900 hover:underline"
        >
          Only You
        </a>
        <p className="text-sm text-gray-700 mt-2 flex-grow">
          Charlotte agrees to fake date bad boy Mason to make her best friend
          jealous. But as lines blur, feelings change, and rules are broken.
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Eye className="w-4 h-4 mr-1" />
            <span>7.4M Reads</span>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm rounded">
            Read Now
          </button>
        </div>
      </div>
    </div>
  );
}
