// "use server";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Briefcase, BookOpen, Users, Settings } from "lucide-react";
import Link from "next/link";
import EditProfileButton from "@/app/components/User/EditProfileButton";
import { searchByAuthorName } from "@/app/(acttion)/Story/action";
import { SearchStoryCard } from "@/app/components/Share/SearchStoryCard";

const UserProfile = async ({ params }: { params: { username: string } }) => {
  // Fetching user data on the server
  const userData = await getUserData(params.username);

  const { stories } = await searchByAuthorName(params.username);

  // Function to get user data
  async function getUserData(username: string) {
    // Replace this with your actual API call or data fetching logic
    // For example, you can use the searchByAuthorName function or a DB query
    return {
      username: "John Doe",
      email: "john.doe@example.com",
      profileImage:
        "https://images.unsplash.com/photo-1739325755246-0000aca42302?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
      backgroundImage: "/bg.jpg",
    };
  }

  return (
    <div>
      <div
        className="flex justify-center items-center h-[400px] p-6"
        style={{
          backgroundImage: `url(${userData.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-md border-none text-white p-6">
          <div className="flex flex-col items-center">
            <Avatar className="w-24 h-24 mb-4 border-4 border-white">
              <AvatarImage src={userData.profileImage} alt="User Image" />
              <AvatarFallback>{userData.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">{userData.username}</h2>
            <p className="flex items-center gap-2">
              <Mail size={16} /> {userData.email}
            </p>
          </div>
          <div className="mt-6 flex justify-between text-center">
            <div className="flex w-10 flex-col items-center gap-1">
              <Briefcase size={20} />
              <span>12</span>
            </div>
            <div className="flex w-10 flex-col items-center gap-1">
              <BookOpen size={20} />
              <span>Reading </span>
            </div>
            <div className="flex w-10 flex-col items-center gap-1">
              <Users size={20} />
              <span>Followers-120</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex container mx-auto flex-row justify-between border-b items-center p-4">
        <div className="flex flex-row  justify-center items-center gap-4">
          <Link href={"#"}>About</Link>
          <Link href={"#"}>Conversation</Link>
          <Link href={"#"}>Following</Link>
        </div>
        <EditProfileButton userData={userData} />
      </div>

      <div className="min-h-screen">
        <div className="container mx-auto flex flex-col justify-center items-center">
          <div className="flex flex-row px-4 py-2 w-[650px] justify-between items-center">
            <div>Stories By {userData.username}</div>
            <Button>
              <Settings />
            </Button>
          </div>
          {stories?.map((story: any, index: number) => (
            <SearchStoryCard key={index} story={story} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
