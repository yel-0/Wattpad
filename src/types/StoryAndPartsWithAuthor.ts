export interface StoryPartData {
  _id: string;
  title: string;
  content: any;
  visibility: "public" | "private";
  createdAt: string; // ISO string
}

export interface StorySummaryPart {
  _id: string;
  title: string;
}

export interface StoryAuthor {
  name: string;
  email: string;
  profileImage: string;
  bgImage: string;
  isAdmin?: boolean;
}

export interface StoryData {
  _id: string;
  title: string;
  description: string;
  coverImage?: string;
  parts: StorySummaryPart[];
  author: StoryAuthor;
}

export interface GetStoryAndPartResponse {
  story: StoryData;
  part: StoryPartData;
}
