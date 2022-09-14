import React, { useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { Input, Button, Space, Typography, IconKey } from '@supabase/ui';

export function UpdatePassword({ supabaseClient }: { supabaseClient: SupabaseClient }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    const { error } = await supabaseClient.auth.update({ password });
    if (error) setError(error.message);
    else setMessage('Your password has been updated');
    setLoading(false);
  };

  return (
    <form id='auth-update-password' onSubmit={handlePasswordReset}>
      <Space size={4} direction={'vertical'}>
        <Space size={3} direction={'vertical'}>
          <Input
            label='New password'
            placeholder='Enter your new password'
            type='password'
            icon={<IconKey size={21} stroke={'#666666'} />}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <Button block size='large' htmlType='submit' icon={<IconKey size={21} />} loading={loading}>
            Update password
          </Button>
          gg{' '}
        </Space>
        {message && <Typography.Text>{message}</Typography.Text>}
        {error && <Typography.Text type='danger'>{error}</Typography.Text>}
      </Space>
    </form>
  );
}
