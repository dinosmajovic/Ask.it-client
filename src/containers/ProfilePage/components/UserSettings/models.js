import {
  allowOnlyLetters,
  beEqualTo,
  beLongerThan,
  beNotEmpty,
  beValidEmail
} from '../../../../validation/predicates';
import { must } from '../../../../validation/rule-builder';

export const ruleSetPassword = (password) => ({
  password: must(beNotEmpty)
    .withMessage('New password is required')
    .and(beLongerThan(7))
    .withMessage('Password must be at least 8 characters long'),
  confirmPassword: must(beNotEmpty)
    .withMessage('Confirm password is required')
    .and(beEqualTo(password))
    .withMessage('Password and password confirmation must match')
});

export const ruleSetUpdate = {
  email: must(beNotEmpty)
    .withMessage('Email is required')
    .and(beValidEmail)
    .withMessage('Not a valid email'),
  name: must(beNotEmpty)
    .withMessage('Name is required')
    .and(allowOnlyLetters)
    .withMessage('Name must be only letters')
    .and(beLongerThan(1))
    .withMessage('Name must be at least 1 character long')
};
