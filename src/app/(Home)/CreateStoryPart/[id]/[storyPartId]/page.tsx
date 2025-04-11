// app/(Home)/CreateStoryPart/[id]/[storyPartId]/page.tsx

export const dynamic = "force-dynamic";

import Editor from "@/app/components/User/Editor";
import { getStoryAndPart } from "@/app/(acttion)/StoryPart/action";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; storyPartId: string }>;
}) {
  const storyId = (await params).id;
  const storyPartId = (await params).storyPartId;

  const data = await getStoryAndPart(storyId, storyPartId);

  const d = JSON.parse(JSON.stringify(data));

  return (
    <div>
      <Editor data={d} storyId={storyId} storyPartId={storyPartId} />
    </div>
  );
}
