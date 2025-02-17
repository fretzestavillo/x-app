export interface Post {
  id: string;
  profilePic: string;
  fullName: string;
  username: string;
  postDate: string;
  postText: string;
  postContent?: string; // Can be image, video, or GIF
  messageCount: number;
  repostCount: number;
  heartCount: number;
  viewsCount: number;
}
