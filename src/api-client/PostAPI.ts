import axios from '../lib/axios';
import { AxiosInstance } from 'axios';
import { API } from './API';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@src/lib/initSupabase';
import type { Database } from '@src/types/database';
class PostAPI extends API {
  private static instance: PostAPI;
  instance: typeof PostAPI;
  private constructor(axios: AxiosInstance, private supa: SupabaseClient) {
    super(axios);
  }

  public static getInstance(axios: AxiosInstance, supa: SupabaseClient) {
    if (!this.instance) {
      this.instance = new PostAPI(axios, supabase);
    }
    return this.instance;
  }

  handleLike = async (postId: string, likesPost: boolean) => {
    try {
      const user = this.supa.auth.user();
      if (!user) {
        throw new Error('User not logged in');
      }
      const { data: createdLike } = await this.supa
        .from<Database['public']['Tables']['post_likes']['Row']>('post_likes')
        .upsert([
          {
            post_id: postId,
            user_id: user.id,
            does_like: likesPost ? true : false,
          },
        ])
        .match({ post_id: postId, user_id: user.id })
        .throwOnError();

      console.log(createdLike);
    } catch (err) {
      this.handleError(err);
    }
  };
}

const postClient = PostAPI.getInstance(axios, supabase);

export { postClient };
