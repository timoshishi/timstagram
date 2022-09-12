import React, { FC, ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { UserProvider } from '@supabase/auth-helpers-react';
import { ChakraProvider } from '@chakra-ui/react';
import { GlobalModal } from '@features/Modal';
import { supabase } from '@src/lib/initSupabase';
import { promises } from 'fs';

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

export const getImageFileNode = async (filePath: string): Promise<[Buffer, File]> => {
  const fileBuffer = await promises.readFile(filePath);
  return [fileBuffer, new File([fileBuffer], 'file' as string, { type: 'image/png' })];
};
