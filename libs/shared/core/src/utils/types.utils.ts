export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type Nullable<T> = T | null | undefined
