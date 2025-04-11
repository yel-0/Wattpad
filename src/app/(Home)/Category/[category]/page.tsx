import { searchByCategoryName } from "@/app/(acttion)/Story/action";
import CategoryStory from "@/app/components/User/CategoryStory";

const page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const category = (await params).category;

  const { stories } = await searchByCategoryName(category.toLowerCase(), 1);
  //   console.log(stories);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 capitalize">
        Category: {category.toLowerCase()}
      </h1>

      {stories?.length ? (
        <div className="flex flex-row justify-start gap-4 items-center flex-wrap">
          {stories.map((story: any) => (
            <CategoryStory key={story._id} {...story} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No stories found in this category.</p>
      )}
    </div>
  );
};

export default page;
