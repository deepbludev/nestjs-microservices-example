import { IValueObjectProps,ValueObject } from '../value-object'

interface PropType extends IValueObjectProps {
  foo: string
  is: boolean
}
class TestValueObject extends ValueObject<PropType> {
  constructor(props: PropType) {
    super(props)
  }

  public static override isValidProps(props: PropType): boolean {
    return this.validator.string(props.foo)
  }
}

class TestValueObject2 extends ValueObject<PropType> {
  constructor(props: PropType) {
    super(props)
  }
}

class TestValueObject3 extends ValueObject<{
  foo: string
  is: boolean
  bar: string
}> {
  constructor(props: { foo: string; is: boolean; bar: string }) {
    super(props)
  }
}

describe(ValueObject, () => {
  it('should be defined', () => {
    expect(ValueObject).toBeDefined()
  })

  const vo = new TestValueObject({ foo: 'bar', is: true })

  it('should be able to create a new instance', () => {
    expect(vo).toBeDefined()
    expect(vo.props).toEqual({ foo: 'bar', is: true })
  })

  it('should be a Value Object domain object type', () => {
    expect(vo.domType).toEqual('ValueObject')
  })

  it('should be able to compare value objects', () => {
    const vo1 = new TestValueObject({ foo: 'bar', is: true })
    const vo2 = new TestValueObject({ foo: 'baz', is: true })
    expect(vo.equals(vo1)).toBeTruthy()
    expect(vo.equals(vo2)).toBeFalsy()
    expect(vo.equals(vo)).toBeTruthy()
  })

  it('should be able to compare value objects with different types', () => {
    const vo1 = new TestValueObject2({ foo: 'bar', is: true })
    expect(vo.equals(vo1)).toBeFalsy()
  })

  it('should be able to compare value objects with different props', () => {
    const vo1 = new TestValueObject3({ foo: 'bar', is: true, bar: 'baz' })
    expect(vo.equals(vo1)).toBeFalsy()
  })

  it('should be able to clone value objects', () => {
    const vo1 = vo.clone()
    expect(vo.equals(vo1)).toBeTruthy()
  })

  it('should not be able to set a prop', () => {
    const set = () => (vo.props.foo = 'baz')
    expect(set).toThrow()
  })
})
