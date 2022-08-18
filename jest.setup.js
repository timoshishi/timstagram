// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
// https://stackoverflow.com/questions/41318115/testing-two-environments-with-jest
import '@testing-library/jest-dom/extend-expect';
import { TextEncoder, TextDecoder } from 'util';
import { server } from './src/mocks/server.js';

// Establish API mocking before all tests.
window.TextEncoder = TextEncoder;
window.TextDecoder = TextDecoder;
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
