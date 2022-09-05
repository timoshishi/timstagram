import { customAlphabet } from 'nanoid';
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQXYZ0123456789';
export const customNano = customAlphabet(alpha, 6);
