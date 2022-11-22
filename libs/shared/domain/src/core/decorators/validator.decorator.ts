/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerDecorator, ValidationOptions } from 'class-validator'

export function validator<V>(name: string, validate: (value: V) => boolean) {
  return function (validationOptions?: ValidationOptions) {
    return function (object: unknown, propertyName: string) {
      registerDecorator({
        name: `is${name}`,
        target: object.constructor,
        propertyName: propertyName,
        constraints: [],
        options: validationOptions,
        validator: { validate: value => validate(value) },
      })
    }
  }
}

export const is = <V>(
  name: string,
  validate: (value: V) => boolean,
  validationOptions: ValidationOptions
) => validator(name, validate)(validationOptions)
