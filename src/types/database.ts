export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      flagged_media: {
        Row: {
          id: string;
          mediaHash: string;
        };
        Insert: {
          id: string;
          mediaHash: string;
        };
        Update: {
          id?: string;
          mediaHash?: string;
        };
      };
      post_hashes: {
        Row: {
          postHash: string;
        };
        Insert: {
          postHash: string;
        };
        Update: {
          postHash?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          post_body: string;
          user_id: string;
          media_type: string | null;
          media_url: string;
          published: boolean;
          media_id: string;
          filename: string;
          user_avatar_url: string | null;
          username: string;
          postHash: string;
          user_deleted: boolean;
          flagged: boolean;
          deleted: boolean;
          flag_count: number;
          view_count: number;
          created_at: string;
          is_bot_post: boolean;
          is_shared: boolean;
        };
        Insert: {
          id: string;
          post_body: string;
          user_id: string;
          media_type?: string | null;
          media_url: string;
          published?: boolean;
          media_id: string;
          filename: string;
          user_avatar_url?: string | null;
          username: string;
          postHash: string;
          user_deleted?: boolean;
          flagged?: boolean;
          deleted?: boolean;
          flag_count?: number;
          view_count?: number;
          created_at?: string;
          is_bot_post?: boolean;
          is_shared?: boolean;
        };
        Update: {
          id?: string;
          post_body?: string;
          user_id?: string;
          media_type?: string | null;
          media_url?: string;
          published?: boolean;
          media_id?: string;
          filename?: string;
          user_avatar_url?: string | null;
          username?: string;
          postHash?: string;
          user_deleted?: boolean;
          flagged?: boolean;
          deleted?: boolean;
          flag_count?: number;
          view_count?: number;
          created_at?: string;
          is_bot_post?: boolean;
          is_shared?: boolean;
        };
      };
      profiles: {
        Row: {
          id: string;
          username: string;
          avatar_filename: string | null;
          updated_at: string | null;
          avatar_url: string;
          bio: string;
          created_at: string;
          banned: boolean;
          is_bot: boolean;
        };
        Insert: {
          id: string;
          username: string;
          avatar_filename?: string | null;
          updated_at?: string | null;
          avatar_url?: string;
          bio?: string;
          created_at?: string;
          banned?: boolean;
          is_bot?: boolean;
        };
        Update: {
          id?: string;
          username?: string;
          avatar_filename?: string | null;
          updated_at?: string | null;
          avatar_url?: string;
          bio?: string;
          created_at?: string;
          banned?: boolean;
          is_bot?: boolean;
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
          kind: string | null;
          aspect_ratio: number;
          category: string | null;
          hash: string | null;
          placeholder: string | null;
          metadata: Json | null;
          userMetadata: Json | null;
          source: string;
          postId: string | null;
          user_id: string;
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
          kind?: string | null;
          aspect_ratio: number;
          category?: string | null;
          hash?: string | null;
          placeholder?: string | null;
          metadata?: Json | null;
          userMetadata?: Json | null;
          source: string;
          postId?: string | null;
          user_id: string;
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
          kind?: string | null;
          aspect_ratio?: number;
          category?: string | null;
          hash?: string | null;
          placeholder?: string | null;
          metadata?: Json | null;
          userMetadata?: Json | null;
          source?: string;
          postId?: string | null;
          user_id?: string;
          scraped?: boolean;
          deleted?: boolean;
          created_at?: string;
        };
      };
      post_flags: {
        Row: {
          post_id: string;
          user_id: string;
          reason: Database["public"]["Enums"]["FlagReason"];
          more_info: string | null;
          created_at: string;
        };
        Insert: {
          post_id: string;
          user_id: string;
          reason: Database["public"]["Enums"]["FlagReason"];
          more_info?: string | null;
          created_at?: string;
        };
        Update: {
          post_id?: string;
          user_id?: string;
          reason?: Database["public"]["Enums"]["FlagReason"];
          more_info?: string | null;
          created_at?: string;
        };
      };
      post_likes: {
        Row: {
          post_id: string;
          user_id: string;
          created_at: string;
          does_like: boolean;
        };
        Insert: {
          post_id: string;
          user_id: string;
          created_at?: string;
          does_like?: boolean;
        };
        Update: {
          post_id?: string;
          user_id?: string;
          created_at?: string;
          does_like?: boolean;
        };
      };
      _UserFollows: {
        Row: {
          A: string;
          B: string;
        };
        Insert: {
          A: string;
          B: string;
        };
        Update: {
          A?: string;
          B?: string;
        };
      };
      _PostToTag: {
        Row: {
          A: string;
          B: string;
        };
        Insert: {
          A: string;
          B: string;
        };
        Update: {
          A?: string;
          B?: string;
        };
      };
      tags: {
        Row: {
          id: string;
          name: string;
        };
        Insert: {
          id: string;
          name: string;
        };
        Update: {
          id?: string;
          name?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      FlagReason: "ABUSIVE" | "ILLEGAL" | "COPYRIGHT" | "OTHER";
    };
  };
}

