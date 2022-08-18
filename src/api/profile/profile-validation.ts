import { body, check, ValidationChain } from 'express-validator';
import { ValidationTuple } from 'types/index';
import { NextUserMiddleware } from '@api/router';
// import { checkValidation } from '@api/router';

export const updateProfileValidator: ValidationChain[] = [
  body('bio').isString().isLength({ min: 0, max: 140 }).trim().escape(),
  // checkValidation,
];
