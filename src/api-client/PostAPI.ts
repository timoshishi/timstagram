import axios from '../lib/axios';
import { AxiosInstance } from 'axios';
import { API } from './API';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@src/lib/initSupabase';
import type { Database } from '@src/types/database';
class PostAPI extends API {
  private static instance: PostAPI;
  private supa: SupabaseClient;
  private constructor(axios: AxiosInstance, supa: SupabaseClient) {
    super(axios);
    this.supa = supa;
  }

  public static getInstance(axios: AxiosInstance, supa: SupabaseClient) {
    if (!this.instance) {
      this.instance = new PostAPI(axios, supabase);
    }
    return this.instance;
  }

  handleLike = async ({ postId, hasLiked, userId }: { postId: string; hasLiked: boolean; userId: string }) => {
    try {
      const { data: createdLike } = await this.supa
        .from<Database['public']['Tables']['post_likes']['Row']>('post_likes')
        .upsert([
          {
            post_id: postId,
            user_id: userId,
            does_like: hasLiked ? false : true, // if they have liked it we are toggling it to false
          },
        ])
        .match({ post_id: postId, user_id: userId })
        .throwOnError();
      // console.log(postId, hasLiked, userId);
      console.log('LIKE', createdLike);
    } catch (err) {
      this.handleError(err);
    }
  };
}

const postClient = PostAPI.getInstance(axios, supabase);

export { postClient };
