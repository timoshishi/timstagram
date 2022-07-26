export interface Poster {
  username: string;
  userDescription?: string;
  avatarURL: string;
  followerCount: number;
  followingCount: number;
}

export interface PostComment {
  username: string;
  title: string;
}
