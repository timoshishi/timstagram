import { SupaUser } from 'types/index';

export const supaUser: SupaUser = {
  id: '26b7b836-3427-4686-95da-cd3ec4b7fbd7',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'timfrrst@gmail.com',
  email_confirmed_at: '2021-09-01T20:00:00.000Z',
  phone: '',
  confirmed_at: '2021-09-01T20:00:00.000Z',
  last_sign_in_at: '2021-09-01T20:00:00.000Z',
  app_metadata: {
    provider: 'email',
    providers: ['email'],
  },
  user_metadata: {
    avatarFilename: 'e719921c-023f-43e0-b9d2-92dd55af12e2.png',
    avatarUrl: 'https://witter-dev.s3.amazonaws.com/e719921c-023f-43e0-b9d2-92dd55af12e2.png',
    bio: '',
    username: 'mrman',
  },
  identities: [],
  created_at: '2021-09-01T20:00:00.000Z',
  updated_at: '2021-09-01T20:00:00.000Z',
};

export const supaUserResponse = {
  user: supaUser,
  error: null,
  loading: false,
};

export const supabaseLoggedOutResponse = {
  user: null,
  accessToken: null,
};

export const supaUserLoggedInAuthResponse = {
  user: {
    id: 'ed84495e-81ea-4631-a831-8312348ac2bd',
    aud: 'authenticated',
    role: 'authenticated',
    email: 'test1@test.com',
    email_confirmed_at: null,
    phone: '',
    confirmed_at: null,
    last_sign_in_at: null,
    app_metadata: { provider: 'email', providers: ['email'] },
    user_metadata: {
      avatarUrl: 'https://avatars0.githubusercontent.com/u/1752?v=4',
      bio: 'Quibusdam deserunt atque ex molestias.',
      username: 'test1',
    },
    identities: [],
    created_at: null,
    updated_at: null,
    'supabase-auth-helpers-note':
      'This user payload is retrieved from the cached JWT and might be stale. If you need up to date user data, please call the `getUser` method in a server-side context!',
    exp: 1661371841,
    sub: 'ed84495e-81ea-4631-a831-8312348ac2bd',
  },
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjYxMzcxODQxLCJzdWIiOiJlZDg0NDk1ZS04MWVhLTQ2MzEtYTgzMS04MzEyMzQ4YWMyYmQiLCJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJhdmF0YXJVcmwiOiJodHRwczovL2F2YXRhcnMwLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE3NTI_dj00IiwiYmlvIjoiUXVpYnVzZGFtIGRlc2VydW50IGF0cXVlIGV4IG1vbGVzdGlhcy4iLCJ1c2VybmFtZSI6InRlc3QxIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIn0.G0X4vXrmJYZM9hhqsOJS7tDZPGkp2dnB5B60XCF38AY',
};
