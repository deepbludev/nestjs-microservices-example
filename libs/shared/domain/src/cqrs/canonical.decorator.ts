export const canonical = (canonicalName: string) =>
  function <
    T extends {
      canonical: string
    }
  >(target: T) {
    target.canonical = canonicalName
  }
