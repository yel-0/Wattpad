import { SearchFilters } from "@/app/components/Share/SearchFilters";
import { SearchStoryCard } from "@/app/components/Share/SearchStoryCard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { searchByStoryTitle } from "@/app/(acttion)/Story/action";
import UserCard from "@/app/components/Share/UserCard";
import { searchUsersByName } from "@/app/(acttion)/User/User";

const Search = async ({ params }: { params: Promise<{ title: string }> }) => {
  const title = (await params).title;

  return (
    <div className="flex gap-6  container mx-auto">
      <Tabs defaultValue="stories" className="my-6">
        <TabsList>
          <TabsTrigger value="stories" className="font-semibold">
            Stories
          </TabsTrigger>
          <TabsTrigger value="profiles" className="text-gray-500">
            Profiles
          </TabsTrigger>
        </TabsList>
        <TabsContent value="stories" className="mt-6 flex ">
          <Stories title={title} />
        </TabsContent>
        <TabsContent value="profiles" className="w-[90vw] ">
          <Profile title={title} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
const Stories = async ({ title }: { title: string }) => {
  const { stories } = await searchByStoryTitle(title);

  return (
    <div className="flex">
      <SearchFilters title={title} />
      <div className=" ">
        <div className="">
          {stories?.map((story, index) => (
            <SearchStoryCard key={index} story={story} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Profile = async ({ title }: { title: string }) => {
  const { users } = await searchUsersByName(title);

  if (!users || users.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No users found for "{title}"
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {users.map((user: any, index: number) => (
        <UserCard
          key={index}
          user={{
            name: user.name,
            email: user.email,
            profilePic:
              user.profilePic ||
              "http://localhost:3000/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdcgn707fg%2Fimage%2Fupload%2Fv1744095226%2FImage%2Fbslfjsuwk7g8k9jz3ldl.jpg&w=384&q=75",
            stories: user.stories || 0,
            readingList: user.readingList || 0,
            followers: user.followers || 0,
          }}
        />
      ))}
    </div>
  );
};

export default Search;
