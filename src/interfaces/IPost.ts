export interface IPost {
  id: string;
  userUid: string;
  userName: string;
  userAvatarUrl: string;
  message?: string;
  videoUrl?: string;
  imageUrl?: string;
  createdAt?: any;
}