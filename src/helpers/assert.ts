export function assertNever(value: never): never {
  throw new TypeError(`Unexpected value: ${value}`);
}
