import { MotherCreator } from './mother.creator'

export class IntegerMother {
  static random(max?: number): number {
    return MotherCreator.faker().datatype.number({ max })
  }
}
