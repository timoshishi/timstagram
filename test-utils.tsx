import React, { FC, ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { UserProvider } from '@supabase/auth-helpers-react';
import { ChakraProvider } from '@chakra-ui/react';
import { GlobalModal } from '@common/components/Modal/GlobalModal';
import { supabase } from '@src/lib/initSupabase';

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  return (
    <UserProvider supabaseClient={supabase}>
      <ChakraProvider>
        <GlobalModal>{children}</GlobalModal>
      </ChakraProvider>
    </UserProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): RenderResult =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
