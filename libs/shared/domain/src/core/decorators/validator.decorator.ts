/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerDecorator, ValidationOptions } from 'class-validator'

export function validator(name: string, validate: (value: any) => boolean) {
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

export const is = (
  name: string,
  validate: (value: any) => boolean,
  validationOptions: ValidationOptions
) => validator(name, validate)(validationOptions)
