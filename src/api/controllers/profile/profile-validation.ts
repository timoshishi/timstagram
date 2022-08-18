import { body, check, ValidationChain } from 'express-validator';

export const updateProfileValidator: ValidationChain[] = [
  body('bio').isString().isLength({ min: 0, max: 140 }).trim().escape(),
  // checkValidation,
];
