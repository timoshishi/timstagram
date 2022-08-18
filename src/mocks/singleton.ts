import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { SupabaseClient } from '@supabase/supabase-js';
import supabaseService from '../lib/initSupabaseServer';

// Instances must be default exports to work with jest-mock-extended
import prisma from '../lib/prisma';
jest.mock('../lib/prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});
export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

jest.mock('../lib/initSupabaseServer', () => ({
  __esModule: true,
  default: mockDeep<SupabaseClient>(),
}));

beforeEach(() => {
  mockReset(supabaseServiceMock);
});
export const supabaseServiceMock = supabaseService as unknown as DeepMockProxy<SupabaseClient>;
