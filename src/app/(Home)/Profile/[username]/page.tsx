import { SearchStoryCard } from "@/app/components/Share/SearchStoryCard";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Briefcase, BookOpen, Users, Settings } from "lucide-react";
import Link from "next/link";
import { Facebook, Twitter } from "lucide-react";
import FollowUserCard from "@/app/components/Share/FollowUserCard";
import { searchByAuthorName } from "@/app/(acttion)/Story/action";

const UserProfile = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const username = (await params).username;

  const { stories } = await searchByAuthorName(username);

  return (
    <div>
      <div
        className="flex justify-center items-center h-[400px] p-6"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1739268515254-631fda640a1c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-md border-none  bg-transparent text-white  p-6">
          <div className="flex flex-col items-center">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage
                src="https://images.unsplash.com/photo-1739325755246-0000aca42302?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8"
                alt="User Image"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className=" flex items-center gap-2">
              <Mail size={16} /> john.doe@example.com
            </p>
          </div>
          <div className="mt-6 flex justify-between text-center">
            <div className="flex flex-col items-center gap-1">
              <Briefcase size={20} />
              <span>Software Engineer</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <BookOpen size={20} />
              <span>Reading List</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Users size={20} />
              <span>Followers: 120</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-around border-b items-center  p-4">
        <div className="flex flex-row justify-center items-center gap-4">
          <Link href={"#"}>About</Link>
          <Link href={"#"}>Conversation</Link>
          <Link href={"#"}>Following</Link>
        </div>

        <Button>
          <Settings /> Edit
        </Button>
      </div>
      <div className="min-h-screen">
        <div>
          <div className="container mx-auto  flex flex-col justify-center items-center">
            <div className="flex flex-row px-4 py-2 w-[650px] justify-between items-center">
              <div>Stories By Yel</div>
              <Button>
                <Settings />
              </Button>
            </div>
            {stories?.map((story, index) => (
              <SearchStoryCard key={index} story={story} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center">
        <FollowUserCard />
      </div>
    </div>
  );
};

export default UserProfile;
