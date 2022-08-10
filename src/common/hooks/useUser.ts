import { User, useUser } from '@supabase/auth-helpers-react';
import useSWR from 'swr';
import { fetcher } from 'src/lib/axios';
import { PrelimUser } from '@pages/api/user/[id]';

export default (): {
  user: (User & PrelimUser) | null;
  isLoading: boolean;
  error: unknown | null;
} => {
  const { user, error, isLoading } = useUser();
  const { data, error: swrError } = useSWR(user?.id ? `/user/${user.id}` : null, fetcher);
  console.log('DATA', data);
  return {
    user: user && data ? data : null,
    error: error || swrError,
    isLoading: isLoading || (!data && !error && !swrError),
  };
};
