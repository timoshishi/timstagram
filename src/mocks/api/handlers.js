import { rest } from 'msw';
import { supabaseLoggedOutResponse, supaUserLoggedInAuthResponse } from '../supaUser';

export const userAuthResponse = {
  loggedIn: rest.get('/api/auth/user', (req, res, ctx) => {
    return res(ctx.json(supaUserLoggedInAuthResponse));
  }),
  loggedOut: rest.get('/api/auth/user', (req, res, ctx) => {
    return res(ctx.json(supabaseLoggedOutResponse));
  }),
};
