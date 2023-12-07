import type { Entries } from 'type-fest'

// Objects
// const objectExample = {a: 1};
// const objectEntries: Entries<typeof objectExample> = [['a', 1]];

export const keysOf = <T extends object>(arr: T) =>
  Object.keys(arr) as Array<keyof T>

export const entriesOf = <T extends object>(arr: T) =>
  Object.entries(arr) as Entries<T>

type HasOwn = (val: Object, key: string | symbol) => boolean
export const hasOwn: HasOwn = (val, key) =>
  Object.prototype.hasOwnProperty.call(val, key)
