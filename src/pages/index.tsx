import { Auth, Card, Typography, Space, Button, Icon } from '@supabase/ui';
import { supabase } from '../lib/initSupabase';
import { Box } from '@chakra-ui/react';
import { Navbar } from '@common/layout/Navbar';
import { useUser } from '@supabase/auth-helpers-react';

const Index = () => {
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
    <Box w='full' h='150vh'>
      {/* <Navbar /> */}
      <div style={{ maxWidth: '420px', margin: '96px auto' }}>
        <Card>
          <View />
        </Card>
      </div>
    </Box>
  );
};

export default Index;
