export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          id: string;
          checksum: string;
          finished_at: string | null;
          migration_name: string;
          logs: string | null;
          rolled_back_at: string | null;
          started_at: string;
          applied_steps_count: number;
        };
        Insert: {
          id: string;
          checksum: string;
          finished_at?: string | null;
          migration_name: string;
          logs?: string | null;
          rolled_back_at?: string | null;
          started_at?: string;
          applied_steps_count?: number;
        };
        Update: {
          id?: string;
          checksum?: string;
          finished_at?: string | null;
          migration_name?: string;
          logs?: string | null;
          rolled_back_at?: string | null;
          started_at?: string;
          applied_steps_count?: number;
        };
      };
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
      media: {
        Row: {
          id: string;
          bucket: string;
          type: string;
          alt: string | null;
          filename: string;
          size: number;
          width: number;
          height: number;
          kind: string | null;
          aspect_ratio: number;
          scraped: boolean;
          category: string | null;
          deleted: boolean;
          created_at: string;
          hash: string | null;
          placeholder: string | null;
          metadata: Json | null;
          userMetadata: Json | null;
          source: string;
          postId: string | null;
          user_id: string;
          domain: string;
          postFlagFlaggedByUserId: string | null;
          postFlagPostId: string | null;
        };
        Insert: {
          id: string;
          bucket: string;
          type: string;
          alt?: string | null;
          filename: string;
          size: number;
          width: number;
          height: number;
          kind?: string | null;
          aspect_ratio: number;
          scraped?: boolean;
          category?: string | null;
          deleted?: boolean;
          created_at?: string;
          hash?: string | null;
          placeholder?: string | null;
          metadata?: Json | null;
          userMetadata?: Json | null;
          source: string;
          postId?: string | null;
          user_id: string;
          domain: string;
          postFlagFlaggedByUserId?: string | null;
          postFlagPostId?: string | null;
        };
        Update: {
          id?: string;
          bucket?: string;
          type?: string;
          alt?: string | null;
          filename?: string;
          size?: number;
          width?: number;
          height?: number;
          kind?: string | null;
          aspect_ratio?: number;
          scraped?: boolean;
          category?: string | null;
          deleted?: boolean;
          created_at?: string;
          hash?: string | null;
          placeholder?: string | null;
          metadata?: Json | null;
          userMetadata?: Json | null;
          source?: string;
          postId?: string | null;
          user_id?: string;
          domain?: string;
          postFlagFlaggedByUserId?: string | null;
          postFlagPostId?: string | null;
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
          reason: Database['public']['Enums']['FlagReason'];
          more_info: string | null;
          created_at: string;
        };
        Insert: {
          post_id: string;
          user_id: string;
          reason: Database['public']['Enums']['FlagReason'];
          more_info?: string | null;
          created_at?: string;
        };
        Update: {
          post_id?: string;
          user_id?: string;
          reason?: Database['public']['Enums']['FlagReason'];
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
      posts: {
        Row: {
          id: string;
          post_body: string;
          published: boolean;
          flagged: boolean;
          deleted: boolean;
          flag_count: number;
          view_count: number;
          filename: string;
          created_at: string;
          postHash: string;
          author_id: string;
        };
        Insert: {
          id: string;
          post_body: string;
          published?: boolean;
          flagged?: boolean;
          deleted?: boolean;
          flag_count?: number;
          view_count?: number;
          filename: string;
          created_at?: string;
          postHash: string;
          author_id: string;
        };
        Update: {
          id?: string;
          post_body?: string;
          published?: boolean;
          flagged?: boolean;
          deleted?: boolean;
          flag_count?: number;
          view_count?: number;
          filename?: string;
          created_at?: string;
          postHash?: string;
          author_id?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          username: string;
          avatar_url: string;
          avatar_filename: string | null;
          bio: string;
          created_at: string;
          updated_at: string | null;
          banned: boolean;
          is_bot: boolean;
          avatar_bucket: string | null;
          avatar_domain: string | null;
          avatar_id: string | null;
        };
        Insert: {
          id: string;
          username: string;
          avatar_url?: string;
          avatar_filename?: string | null;
          bio?: string;
          created_at?: string;
          updated_at?: string | null;
          banned?: boolean;
          is_bot?: boolean;
          avatar_bucket?: string | null;
          avatar_domain?: string | null;
          avatar_id?: string | null;
        };
        Update: {
          id?: string;
          username?: string;
          avatar_url?: string;
          avatar_filename?: string | null;
          bio?: string;
          created_at?: string;
          updated_at?: string | null;
          banned?: boolean;
          is_bot?: boolean;
          avatar_bucket?: string | null;
          avatar_domain?: string | null;
          avatar_id?: string | null;
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
      FlagReason: 'ABUSIVE' | 'ILLEGAL' | 'COPYRIGHT' | 'OTHER';
    };
  };
}
