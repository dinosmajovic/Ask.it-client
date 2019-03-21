import {
  allowOnlyLetters,
  beLongerThan,
  beNotEmpty,
  beValidEmail
} from '../../validation/predicates';
import { must } from '../../validation/rule-builder';

export const ruleSetRegister = {
  email: must(beNotEmpty)
    .withMessage('Email is required')
    .and(beValidEmail)
    .withMessage('Not a valid email'),
  password: must(beNotEmpty)
    .withMessage('Password is required')
    .and(beLongerThan(7))
    .withMessage('Password must be at least 8 characters long'),
  name: must(beNotEmpty)
    .withMessage('Name is required')
    .and(allowOnlyLetters)
    .withMessage('Name must be only letters')
    .and(beLongerThan(1))
    .withMessage('Name must be at least 1 character long')
};
