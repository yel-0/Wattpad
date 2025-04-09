export interface StoryType {
  _id: string;
  title: string;
  description: string;
  coverImage?: string;
  parts: {
    _id: any;
    title: string;
  }[];

  __v?: any;
  createdAt?: string;
  updatedAt?: string;
  views?: number;
  likes?: number;
  copyright?: number;
  language?: string;
  visibility?: "public" | "private";
  category?: string;
}
