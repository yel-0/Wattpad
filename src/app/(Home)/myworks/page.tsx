import { Button } from "@/components/ui/button";
import Link from "next/link";
import MyWorkStoryCard from "@/app/components/User/MyWorkStoryCard";
import { GetStoriesByAuthor } from "@/app/(acttion)/Story/action";
const MyWork = async () => {
  const data = await GetStoriesByAuthor(1);
  const result = JSON.parse(JSON.stringify(data));
  return (
    <div className="min-h-screen  container max-w-2xl p-4 mx-auto">
      <div className="flex flex-row py-4 justify-between items-center">
        <h3 className="text-xl font-bold">My Stories</h3>
        <Link href={"/myworks/new"}>
          <Button className="bg-orange-500 hover:bg-orange-600">
            + Add Story
          </Button>
        </Link>
      </div>
      {result?.stories?.map((story: any) => (
        <MyWorkStoryCard key={story._id} story={story} />
      ))}
    </div>
  );
};

export default MyWork;
