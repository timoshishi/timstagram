import { setupWorker } from 'msw';
import { useUserHandlers } from './api/handlers';

export const worker = setupWorker(...useUserHandlers);
