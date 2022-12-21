/* eslint-disable @typescript-eslint/ban-types */
import { IntegerMother } from './integer.mother'

export class Repeater {
  static random(iterations: number, callback: Function) {
    return Array(iterations || IntegerMother.random(20))
      .fill({})
      .map(() => callback())
  }
}
