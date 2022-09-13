import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import { SupabaseClient } from '@supabase/supabase-js';

// Instances must be default exports to work with jest-mock-extended
import prisma from './clients/prisma';
jest.mock('./clients/prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});
export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

import supabaseService from './clients/initSupabaseServer';
jest.mock('./clients/initSupabaseServer', () => ({
  __esModule: true,
  default: mockDeep<SupabaseClient>(),
}));

beforeEach(() => {
  mockReset(supabaseServiceMock);
});
export const supabaseServiceMock = supabaseService as unknown as DeepMockProxy<SupabaseClient>;

import supabase from './clients/initSupabase';
jest.mock('./clients/initSupabase', () => ({
  __esModule: true,
  default: mockDeep<SupabaseClient>(),
}));

beforeEach(() => {
  mockReset(supabaseMock);
});
export const supabaseMock = supabase as unknown as DeepMockProxy<SupabaseClient>;

import { mockClient } from 'aws-sdk-client-mock';
import { S3Client } from '@aws-sdk/client-s3';
const s3Client = new S3Client({ region: process.env.BUCKET_REGION });
export const s3ClientMock = mockClient(s3Client);
beforeEach(() => {
  s3ClientMock.reset();
});
