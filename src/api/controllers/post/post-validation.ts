import { body, ValidationChain } from 'express-validator';

export const createPostValidator: ValidationChain[] = [
  // body('caption').isString().isLength({ min: 0, max: 140 }).trim().escape(),
];
