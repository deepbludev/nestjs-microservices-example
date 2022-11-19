/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Email } from '@deepblu/ddd'
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator'

export class UserEmail extends Email {
  static readonly invalidMessage = 'email is not valid'
}

export function IsUserEmail(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isUserEmail',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: { validate: value => UserEmail.isValid(value) },
    })
  }
}
