import { Auth, Card, Typography, Space, Button, Icon } from '@supabase/ui';
import { supabase } from '../lib/initSupabase';
import { Box, Center, HStack, Show, VStack } from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';
import { NextPageWithLayout } from 'types/page-types';
const Feed: NextPageWithLayout = () => {
  const { user, error, isLoading } = useUser();

  const View = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <Space direction='vertical' size={6}>
        {error === 'update_password' && (
          <Auth.UpdatePassword supabaseClient={supabase} />
        )}
        {user && (
          <>
            <Typography.Text>You're signed in</Typography.Text>
            <Typography.Text strong>Email: {user.email}</Typography.Text>
            <Button
              icon={<Icon src='/images/flow.svg' type='LogOut' />}
              type='outline'
              onClick={() => supabase.auth.signOut()}>
              Log out
            </Button>
            {error && <Typography.Text>Failed to fetch user!</Typography.Text>}
            {user && !error ? (
              <>
                <Typography.Text type='success'>
                  User data retrieved server-side (in API route):
                </Typography.Text>
                <Typography.Text>
                  <pre>{JSON.stringify(user, null, 2)}</pre>
                </Typography.Text>
              </>
            ) : (
              <div>Loading...</div>
            )}
          </>
        )}
      </Space>
    );
  };

  return (
    <Box w='full' minH='100vh' mt='60px' maxW='100%'>
      <HStack
        w='100%'
        bg='pink'
        alignItems='flex-start'
        rowGap={12}
        columnGap={4}
        pt={50}>
        <VStack
          spacing={10}
          justifyContent='flex-start'
          flexGrow={1}
          h='100%'
          bg='silver'>
          {new Array(20).fill(
            <Box w='100%' h='250px' bg='salmon'>
              <Center>
                <h4>A Box</h4>
              </Center>
            </Box>
          )}
          {/* <Card>
            <View />
          </Card> */}
        </VStack>
        <Show above='lg' ssr>
          <Box w='200px' bg='orange' h='450px' mt='30rem' />
        </Show>
      </HStack>
    </Box>
  );
};
export default Feed;
