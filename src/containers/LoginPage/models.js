import {
  beLongerThan,
  beNotEmpty,
  beValidEmail
} from '../../validation/predicates';
import { must } from '../../validation/rule-builder';

export const ruleSetLogin = {
  email: must(beNotEmpty)
    .withMessage('Email is required')
    .and(beValidEmail)
    .withMessage('Not a valid email'),
  password: must(beNotEmpty)
    .withMessage('Password is required')
    .and(beLongerThan(7))
    .withMessage('Password must be at least 8 characters long')
};
