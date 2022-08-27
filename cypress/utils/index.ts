export const createRandomUserCreds = (): { email: string; password: string; username: string } => {
  const username = 'testuser' + Math.floor(Math.random() * 10000);
  const email = Math.floor(Math.random() * 10000) + 'test12@test.com';
  const password = 'password';
  return { username, email, password };
};
