import { FetchStoryByIdWithoutParts } from "@/app/(acttion)/Story/action";
import PageClient from "@/app/components/User/UpdateStory";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const storyId = (await params).id;

  // Fetch story data by ID
  const { story } = await FetchStoryByIdWithoutParts(storyId);
  const result = JSON.parse(JSON.stringify(story));
  return (
    <div>
      <PageClient story={result} />
    </div>
  );
}
