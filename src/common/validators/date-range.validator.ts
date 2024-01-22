import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class DateRangeValidator implements ValidatorConstraintInterface {
  validate(value: string) {
    if (!value) return false;

    const firstChar = value[0];
    const lastChar = value[value.length - 1];

    const firstCharValid = ['(', '['].includes(firstChar);
    const lastCharValid = [')', ']'].includes(lastChar);

    return firstCharValid && lastCharValid;
  }

  defaultMessage() {
    return 'date_range not valid';
  }
}
