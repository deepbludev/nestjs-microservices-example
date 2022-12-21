/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerDecorator, ValidationOptions } from 'class-validator'

export const validator =
  <V>(name: string, validate: (value: V) => boolean) =>
  (validationOptions?: ValidationOptions) =>
  (object: any, propertyName: string) => {
    registerDecorator({
      name: `is${name}`,
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: { validate: value => validate(value) },
    })
  }

export const is = <V>(
  name: string,
  validate: (value: V) => boolean,
  validationOptions: ValidationOptions
) => validator(name, validate)(validationOptions)
