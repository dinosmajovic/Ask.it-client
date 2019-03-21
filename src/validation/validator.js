import { intersection, isEmpty, isFunction, pickBy } from 'lodash';
import { filter, head, map, mergeWithKey, pick } from 'ramda';

const createPredicate = (rule) => (a) => {
  if (isFunction(rule.when) && !rule.when(a)) return null;
  return rule.test(a) ? null : rule.errorMessage;
};

const createPredicates = map(createPredicate);

const runPredicates = (request) =>
  map((predFn) => predFn(request.value), createPredicates(request.rules));

const runValidation = (request) =>
  head(filter((r) => r != null, runPredicates(request))) || null;

const makeValidationObject = (instance, validator) => {
  const merge = (k, l, r) => ({ value: l, rules: r.rules });
  return mergeWithKey(merge, instance, validator);
};

export const validate = (instance, validator) => {
  const base = Object.keys(validator).reduce(
    (mem, key) => ({ ...mem, [key]: undefined }),
    {}
  );
  const augmentedInstance = { ...base, ...instance };
  const keys = intersection(
    Object.keys(augmentedInstance),
    Object.keys(validator)
  );
  const items = makeValidationObject(
    pick(keys, instance),
    pick(keys, validator)
  );
  const response = map(runValidation, items);

  return pickBy(response, (i) => !isEmpty(i));
};

export const validateProp = (value, collection) =>
  runValidation({ value, rules: collection.rules });

export const isResultValid = (value) => isEmpty(value);

export const isInstanceValid = (instance, validator) =>
  isResultValid(validate(instance, validator));

export const isPropValid = (value, collection) =>
  isResultValid(validateProp(value, collection));
