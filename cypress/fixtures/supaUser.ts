export const supaUser = {
  id: '489418a5-c47f-4287-b4b6-d472d1e7c37e',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'test@test.com',
  email_confirmed_at: null,
  phone: '',
  confirmed_at: null,
  last_sign_in_at: null,
  app_metadata: {
    provider: 'email',
    providers: ['email'],
  },
  user_metadata: {
    avatarUrl: '',
    username: 'test',
    bio: '',
  },
  identities: [],
  created_at: null,
  updated_at: null,
  'supabase-auth-helpers-note':
    'This user payload is retrieved from the cached JWT and might be stale. If you need up to date user data, please call the `getUser` method in a server-side context!',
  exp: 1660565622,
  sub: '489418a5-c47f-4287-b4b6-d472d1e7c37e',
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
