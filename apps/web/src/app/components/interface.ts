export interface Post {
  id: string;
  user: {
    id: string;
    fullName: string;
    username: string;
    profilePic: string;
  };
  profilePic: string;
  fullName: string;
  username: string;
  postDate: string; // Will be formatted in Philippine Time
  postText: string;
  postContent?: string | null;
  messageCount: number;
  repostCount: number;
  heartCount: number;
  viewsCount: number;
}
