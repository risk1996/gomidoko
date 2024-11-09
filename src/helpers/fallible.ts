export function tryOr<T, U = T>(
  fn: () => T,
  fallback: (e: unknown) => U,
): T | U {
  try {
    return fn();
  } catch (e) {
    return fallback(e);
  }
}

export function tryOrNull<T>(fn: () => T): T | null {
  return tryOr(fn, () => null);
}

export async function asyncTryOr<T, U = T>(
  fn: () => Promise<T>,
  fallback: (e: unknown) => U,
): Promise<T | U> {
  try {
    return await fn();
  } catch (e) {
    return fallback(e);
  }
}

export async function asyncTryOrNull<T>(
  fn: () => Promise<T>,
): Promise<T | null> {
  return asyncTryOr(fn, () => null);
}
