import { User, useUser } from '@supabase/auth-helpers-react';
import useSWR from 'swr';
import { fetcher } from 'src/lib/axios';

export default (): {
  user: User | null;
  isLoading: boolean;
  error: unknown | null;
} => {
  const { user, error, isLoading } = useUser();
  const { data, error: swrError } = useSWR(
    user?.id ? `/user/${user.id}` : null,
    fetcher
  );
  return {
    user: user && data ? data : null,
    error: error || swrError,
    isLoading: isLoading || (!data && !error && !swrError),
  };
};
