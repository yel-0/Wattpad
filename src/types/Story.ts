export interface StoryType {
  _id: string;
  title: string;
  coverImage?: string;
  views: number;
  likes: number;
  parts: { title: string }[];
  updatedAt: string;
}
