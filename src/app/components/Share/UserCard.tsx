import { Button } from "@/components/ui/button";
import { BookOpen, List, Users } from "lucide-react";

interface UserProps {
  user: {
    name: string;
    email: string;
    profilePic?: string;
    stories: number;
    readingList: number;
    followers: number;
  };
}

const UserCard: React.FC<UserProps> = ({ user }) => {
  return (
    <div className="flex items-center gap-4 bg-white shadow-lg rounded-lg p-4 w-[500px]  max-w-2xl border">
      {/* Profile Image */}
      <img
        src={user.profilePic || "https://via.placeholder.com/80"}
        alt="Profile"
        className="w-16 h-16 rounded-full object-cover border"
      />

      {/* User Info */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <p className="text-sm text-gray-500">{user.email}</p>

        {/* Stats */}
        <div className="flex gap-3 text-sm mt-2 text-gray-600">
          <span className="flex items-center gap-1">
            <BookOpen size={16} /> {user.stories} Stories
          </span>
          <span className="flex items-center gap-1">
            <List size={16} /> {user.readingList} Reading List
          </span>
        </div>

        {/* Followers */}
        <div className="flex items-center gap-2 mt-2">
          <span className="flex items-center gap-1 text-gray-600">
            <Users size={16} /> {user.followers} Followers
          </span>
          <Button variant="outline" className="ml-auto">
            Follow
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
