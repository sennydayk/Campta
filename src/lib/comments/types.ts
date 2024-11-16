export interface UserProfile {
  uid: string;
  nickname: string;
  profileImg: string;
}

export interface CommentProps {
  id: string;
  postId: string;
  content: string;
  timestamp: string;
  parentId?: string;
  depth: number;
  replies?: CommentProps[];
  uid: string;
  userProfile: UserProfile;
}
