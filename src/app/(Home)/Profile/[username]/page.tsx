// "use server";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Briefcase, BookOpen, Users, Settings } from "lucide-react";
import Link from "next/link";
import EditProfileButton from "@/app/components/User/EditProfileButton";
import { searchByAuthorName } from "@/app/(acttion)/Story/action";
import { SearchStoryCard } from "@/app/components/Share/SearchStoryCard";
import { getUserByUsername } from "@/app/(acttion)/User/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
const UserProfile = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  // Fetching user data on the server
  const session = await getServerSession(authOptions);

  const username = (await params).username;
  const { user } = await getUserByUsername(username);

  const { stories } = await searchByAuthorName(username);

  // Default fallback images
  const DEFAULT_PROFILE_IMAGE =
    "https://plus.unsplash.com/premium_photo-1671934974148-82228b911598?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHVucGx1Z2dlZHxlbnwwfHwwfHx8MA%3D%3D";
  const DEFAULT_BACKGROUND_IMAGE =
    "https://images.unsplash.com/reserve/NFuTknHQTsOc0uHAA4E4_4968226460_33fb941a16_o.jpg?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVucGx1Z2dlZHxlbnwwfHwwfHx8MA%3D%3D";

  // Function to get user data

  if (!user) {
    return <div>User not found.</div>;
  }

  const userResult = JSON.parse(JSON.stringify(user));

  // Set fallback images if user doesn't have them
  const profileImage = user.profileImage || DEFAULT_PROFILE_IMAGE;
  const bgImage = user.bgImage || DEFAULT_BACKGROUND_IMAGE;
  // console.log(user);

  return (
    <div>
      <div
        className="flex justify-center items-center h-[400px] p-6"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-md border-none text-white p-6">
          <div className="flex flex-col items-center">
            <Avatar className="w-24 h-24 mb-4 border-4 border-white">
              <AvatarImage
                className="object-cover"
                src={profileImage}
                alt="User Image"
              />
              <AvatarFallback>{user.userName}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">{user.userName}</h2>
            <p className="flex items-center gap-2">
              <Mail size={16} /> {user.email}
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
        {session?.user.name === username ? (
          <EditProfileButton userData={userResult} />
        ) : (
          <Button>Follow +</Button>
        )}
      </div>

      <div className="min-h-screen">
        <div className="container mx-auto flex flex-col justify-center items-center">
          <div className="flex flex-row px-4 py-2 w-[650px] justify-between items-center">
            <div>Stories By {user.name}</div>
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
