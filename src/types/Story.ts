export interface StoryType {
  __v: any;
  createdAt: any;
  copyright: any;
  language: any;
  visibility: any;
  category: any;
  description: any;
  _id: string;
  title: string;
  coverImage?: string;
  views: number;
  likes: number;
  parts: {
    _id: any;
    title: string;
  }[];
  updatedAt: string;
}
