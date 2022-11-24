import { CanonicalCommand } from './canonical-command'
import { CanonicalQuery } from './canonical-query'

export const canonical = (canonicalName: CanonicalCommand | CanonicalQuery) =>
  function <
    T extends {
      canonical: string
    }
  >(target: T) {
    target.canonical = canonicalName
  }

export const canonicalCommand = (canonicalName: CanonicalCommand) =>
  canonical(canonicalName)

export const canonicalQuery = (canonicalName: CanonicalQuery) =>
  canonical(canonicalName)
