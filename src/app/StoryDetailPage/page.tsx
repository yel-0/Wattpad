import { Eye, BookOpen, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StoryDetailPage() {
  const story = {
    title: "Betrayal: Sweet Pea",
    author: "Author Name",
    reads: "12.4M",
    likes: "1.2K",
    description:
      "When love turns into betrayal, Sweet Pea finds herself caught between passion and revenge. Will she uncover the truth before it's too late? Dive into this emotional rollercoaster filled with romance, heartbreak, and unexpected twists. With every chapter, new secrets emerge, making it impossible to tell who can be trusted. The past haunts her, while the future remains uncertain. Will she find the courage to face the truth and fight for her happiness, or will the weight of deception break her completely?",
    coverImage: "https://img.wattpad.com/cover/163964944-256-k537385.jpg",
    parts: [
      { id: 1, title: "Chapter 1: The Beginning" },
      { id: 2, title: "Chapter 2: The Lie" },
      { id: 3, title: "Chapter 3: Truth Revealed" },
      { id: 4, title: "Chapter 4: Broken Promises" },
    ],
  };

  return (
    <main className="container mx-auto px-4 md:px-10 lg:px-20 mt-5">
      {/* Story Header */}
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        {/* Cover Image */}
        <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
          <img
            src={story.coverImage}
            alt={story.title}
            className="w-48 h-72 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Story Info */}
        <div className="md:w-2/3 flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 hover:text-orange-600 transition duration-200">
              {story.title}
            </h1>
            <p className="text-gray-600 text-sm mt-1 flex justify-center items-center">
              <User className="w-4 h-4 mr-1" /> {story.author}
            </p>
            <p className="text-gray-600 text-sm mt-2 flex justify-center items-center">
              <Eye className="w-4 h-4 mr-1" /> {story.reads} Reads
            </p>
            <p className="text-gray-600 text-sm mt-2 flex justify-center items-center">
              <Heart className="w-4 h-4 mr-1" /> {story.likes} Likes
            </p>
          </div>

          <div className="flex gap-4 mt-4">
            <Button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-sm rounded-md transition duration-200">
              Start Reading
            </Button>
            <Button className="w-full md:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 text-sm rounded-md transition duration-200">
              Add to Favorites
            </Button>
            <Button className="w-full md:w-auto bg-red-500 hover:bg-red-600 text-white px-6 py-3 text-sm rounded-md transition duration-200">
              Like
            </Button>
          </div>
        </div>
      </div>

      {/* Story Description */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900">
          Story Description
        </h2>
        <p className="text-sm text-gray-700 mt-3 leading-relaxed">
          {story.description}
        </p>
      </div>

      {/* Story Parts */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900">Story Parts</h2>
        <div className="mt-4 bg-white p-4 rounded-lg shadow-md divide-y">
          {story.parts.map((part) => (
            <div
              key={part.id}
              className="py-2 flex items-center justify-between"
            >
              <span className="text-gray-800">{part.title}</span>
              <Button variant="outline" className="text-orange-600">
                <BookOpen className="w-4 h-4 mr-1" /> Read
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Total Parts */}
      <div className="mt-6 text-center text-gray-600">
        <p className="text-sm">
          Total Parts:{" "}
          <span className="font-semibold">{story.parts.length}</span>
        </p>
      </div>
    </main>
  );
}
