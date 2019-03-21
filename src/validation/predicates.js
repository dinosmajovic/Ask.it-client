import { isArray, isEmpty, isString } from 'lodash';

export function beNotEmpty(value) {
  return isArray(value) ? !isEmpty(value) : !isNullOrWs(value);
}

export function beLongerThan(param) {
  return (value) => value != null && value.length > param;
}

export function allowOnlyLetters(value) {
  if (isNullOrWs(value)) return true;

  return !/[^A-Za-z ]+/g.exec(value);
}

export function beValidEmail(email) {
  return !isNullOrWs(email) ? !isEmail(email) : true;
}

export function isNullOrWs(value) {
  return value == null || (isString(value) && value.trim().length === 0);
}

export function isEmail(value) {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
}

export function beEqualTo(param) {
  return (value) => value === param;
}
