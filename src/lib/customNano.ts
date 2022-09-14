import nanoidGenerate from 'nanoid/generate';
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQXYZ0123456789';
export const customNano = () => nanoidGenerate(alpha, 6);
