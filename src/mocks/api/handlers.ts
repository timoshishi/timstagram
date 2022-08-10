import { rest } from 'msw';

export const useUserHandlers = [
  rest.get('/api/auth/user', (req, res, ctx) => {
    return res(
      ctx.json({
        user: {
          id: '1',
          username: 'Bobby Daniels',
          avatarURL: '',
        },
      })
    );
  }),
  rest.get('/api/user/:id', (req, res, ctx) => {
    return res(
      ctx.json({
        id: '1',
        username: 'Bennie.Lehner',
        verifiedAt: '2021-11-21T02:50:43.534Z',
        avatarURL: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/830.jpg',
        createdAt: '2022-06-25T08:09:21.888Z',
        updatedAt: '2021-10-06T01:52:18.215Z',
        banned: true,
        isBot: false,
        email: 'Rafaela.Russel@hotmail.com',
      })
    );
  }),
];
