import { Constructor } from '@deepblu/ddd'
import { plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'

export const validateDTO =
  <DTO extends object>(dtoClass: Constructor<DTO>) =>
  (object: DTO): DTO => {
    const dto = plainToClass<DTO, DTO>(dtoClass, object)
    const errors = validateSync(dto)
      .map(error => Object.values(error.constraints))
      .flat()
      .map(message => new Error(message))

    if (errors.length) throw errors

    return dto
  }
