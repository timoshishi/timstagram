export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      profile: {
        Row: {
          id: string;
          username: string | null;
          updated_at: string | null;
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          banned: boolean;
          is_bot: boolean;
        };
        Insert: {
          id: string;
          username?: string | null;
          updated_at?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          banned?: boolean;
          is_bot?: boolean;
        };
        Update: {
          id?: string;
          username?: string | null;
          updated_at?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          banned?: boolean;
          is_bot?: boolean;
        };
      };
      follows: {
        Row: {
          follower_id: string;
          follower_avatar_url: string | null;
          following_id: string;
          following_avatar_url: string | null;
        };
        Insert: {
          follower_id: string;
          follower_avatar_url?: string | null;
          following_id: string;
          following_avatar_url?: string | null;
        };
        Update: {
          follower_id?: string;
          follower_avatar_url?: string | null;
          following_id?: string;
          following_avatar_url?: string | null;
        };
      };
      media: {
        Row: {
          id: string;
          url: string;
          bucket: string;
          type: string;
          alt: string | null;
          filename: string;
          size: number;
          width: number;
          height: number;
          aspect_ratio: number;
          category: string | null;
          user_id: string;
          hash: string | null;
          placeholder: string | null;
          metadata: Json | null;
          source: string;
          scraped: boolean;
          deleted: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          url: string;
          bucket: string;
          type: string;
          alt?: string | null;
          filename: string;
          size: number;
          width: number;
          height: number;
          aspect_ratio: number;
          category?: string | null;
          user_id: string;
          hash?: string | null;
          placeholder?: string | null;
          metadata?: Json | null;
          source: string;
          scraped?: boolean;
          deleted?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          url?: string;
          bucket?: string;
          type?: string;
          alt?: string | null;
          filename?: string;
          size?: number;
          width?: number;
          height?: number;
          aspect_ratio?: number;
          category?: string | null;
          user_id?: string;
          hash?: string | null;
          placeholder?: string | null;
          metadata?: Json | null;
          source?: string;
          scraped?: boolean;
          deleted?: boolean;
          created_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          post_body: string | null;
          user_id: string;
          media_type: string | null;
          media_url: string | null;
          media_id: string;
          user_avatar_url: string;
          username: string;
          published: boolean;
          user_deleted: boolean;
          flagged: boolean;
          deleted: boolean;
          flag_count: number;
          view_count: number;
          likes: number;
          created_at: string;
          is_bot_post: boolean;
          is_shared: boolean;
        };
        Insert: {
          id: string;
          post_body?: string | null;
          user_id: string;
          media_type?: string | null;
          media_url?: string | null;
          media_id: string;
          user_avatar_url: string;
          username: string;
          published?: boolean;
          user_deleted?: boolean;
          flagged?: boolean;
          deleted?: boolean;
          flag_count?: number;
          view_count?: number;
          likes?: number;
          created_at?: string;
          is_bot_post?: boolean;
          is_shared?: boolean;
        };
        Update: {
          id?: string;
          post_body?: string | null;
          user_id?: string;
          media_type?: string | null;
          media_url?: string | null;
          media_id?: string;
          user_avatar_url?: string;
          username?: string;
          published?: boolean;
          user_deleted?: boolean;
          flagged?: boolean;
          deleted?: boolean;
          flag_count?: number;
          view_count?: number;
          likes?: number;
          created_at?: string;
          is_bot_post?: boolean;
          is_shared?: boolean;
        };
      };
      comments: {
        Row: {
          id: string;
          content: string;
          user_id: string;
          post_id: string;
          created_at: string;
        };
        Insert: {
          id: string;
          content: string;
          user_id: string;
          post_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          content?: string;
          user_id?: string;
          post_id?: string;
          created_at?: string;
        };
      };
      post_flags: {
        Row: {
          post_id: string;
          user_id: string;
          reason: 'ABUSIVE' | 'ILLEGAL' | 'COPYRIGHT' | 'OTHER';
          content: string | null;
          created_at: string;
        };
        Insert: {
          post_id: string;
          user_id: string;
          reason: 'ABUSIVE' | 'ILLEGAL' | 'COPYRIGHT' | 'OTHER';
          content?: string | null;
          created_at?: string;
        };
        Update: {
          post_id?: string;
          user_id?: string;
          reason?: 'ABUSIVE' | 'ILLEGAL' | 'COPYRIGHT' | 'OTHER';
          content?: string | null;
          created_at?: string;
        };
      };
      post_likes: {
        Row: {
          post_id: string;
          user_id: string;
          created_at: string;
          doesLike: boolean;
        };
        Insert: {
          post_id: string;
          user_id: string;
          created_at?: string;
          doesLike?: boolean;
        };
        Update: {
          post_id?: string;
          user_id?: string;
          created_at?: string;
          doesLike?: boolean;
        };
      };
      post_tags: {
        Row: {
          post_id: string;
          tag_id: string;
        };
        Insert: {
          post_id: string;
          tag_id: string;
        };
        Update: {
          post_id?: string;
          tag_id?: string;
        };
      };
      tags: {
        Row: {
          id: string;
          name: string;
          media_id: string | null;
        };
        Insert: {
          id: string;
          name: string;
          media_id?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          media_id?: string | null;
        };
      };
    };
    Functions: {};
  };
}
