import { CreateProfileParams } from '@features/Modal/api/profile-api';
import { PrismaClient } from '@prisma/client';
import { Profile } from '@prisma/client';
import { supabaseService } from '@src/lib/initServerSupabase';
import { User, ApiError } from '@supabase/supabase-js';
// create a client that has a client in the constructor
interface SupabaseAuthResponse {
  user: User | null;
  data: User | null;
  error: ApiError | null;
}

export class ProfileAPI {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getProfile(id: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: {
        id,
      },
    });
  }
  /**
   * @description - adds the username to the user's metadata.
   * This is inserted into the profile when the user is confirmed with a postgres trigger
   */
  async addUsernameMetadata({ id, username }: CreateProfileParams): Promise<SupabaseAuthResponse> {
    const meta = await supabaseService.auth.api.updateUserById(id, {
      user_metadata: { username, avatarUrl: '', bio: '' },
    });
    return meta;
  }
  async updateUserAvatar() {}
}
