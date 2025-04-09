import { SearchFilters } from "@/app/components/Share/SearchFilters";
import { SearchStoryCard } from "@/app/components/Share/SearchStoryCard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { searchByStoryTitle } from "@/app/(acttion)/Story/action";
import UserCard from "@/app/components/Share/UserCard";

const Search = async ({ params }: { params: Promise<{ title: string }> }) => {
  const title = (await params).title;

  const { stories } = await searchByStoryTitle(title);
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
          <SearchFilters title={title} />
          <div className=" ">
            <div className="">
              {stories?.map((story, index) => (
                <SearchStoryCard key={index} story={story} />
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="profiles" className="w-[90vw] ">
          <div className="flex flex-col items-center gap-6 p-4">
            <UserCard
              user={{
                name: "Yel Win Thein",
                email: "yel@example.com",
                profilePic:
                  "https://images.unsplash.com/photo-1739104627818-d9159a7daa8d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
                stories: 10,
                readingList: 5,
                followers: 230,
              }}
            />
            <UserCard
              user={{
                name: "Yel Win Thein",
                email: "yel@example.com",
                profilePic:
                  "https://images.unsplash.com/photo-1739104627818-d9159a7daa8d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
                stories: 10,
                readingList: 5,
                followers: 230,
              }}
            />
            <UserCard
              user={{
                name: "Yel Win Thein",
                email: "yel@example.com",
                profilePic:
                  "https://images.unsplash.com/photo-1739104627818-d9159a7daa8d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
                stories: 10,
                readingList: 5,
                followers: 230,
              }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Search;
