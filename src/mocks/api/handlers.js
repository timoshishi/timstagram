import { rest } from 'msw';
import { supaUserResponse } from '../supaUser';
const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjYxMDMzMjU1LCJzdWIiOiI2ZDA2NmY5NS1lM2Y0LTQwYWYtYmY1OS01MzY0MmViNDBhODkiLCJlbWFpbCI6InRpbWZycnN0QGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiYXZhdGFyVXJsIjoiaHR0cHM6Ly93aXR0ZXItZGV2LnMzLmFtYXpvbmF3cy5jb20vMGU3MzlmNTQtY2FiYS00MGUwLWJhNjgtMTNjNjNlNmIzZTEyLnBuZyIsImJpbyI6ImhlcmUncyB0aGUgbmV3IHByb2ZpbGVcbiIsInVzZXJuYW1lIjoieWVyYmFidWVuYSJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCJ9.nulJ5WuX9kKe66_Ug4bT1fdTiHbRq2fKwX6d5XBAGwo';
const refreshToken = 'fDpyOaBm9UoUd9-JiALkBA';

export const useUserHandlers = [
  rest.get('/api/auth/user', (req, res, ctx) => {
    return res(
      ctx.json(supaUserResponse),
      ctx.cookie('sb-access-token', accessToken),
      ctx.cookie('sb-refresh-token', refreshToken)
    );
  }),
  rest.post('/api/auth/callback', (req, res, ctx) => {
    return res(ctx.cookie('sb-access-token', accessToken), ctx.cookie('sb-refresh-token', refreshToken));
  }),
];
