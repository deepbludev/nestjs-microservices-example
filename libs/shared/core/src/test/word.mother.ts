import { MotherCreator } from './mother.creator'

export class WordMother {
  static random({ min = 1, max }: { min?: number; max: number }): string {
    return MotherCreator.faker().lorem.word({
      length: { min, max },
      strategy: 'shortest',
    })
  }
}
