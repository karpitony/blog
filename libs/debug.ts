export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

export function debug(...args: unknown[]): void {
  if (isDev()) {
    console.log(...args);
  }
}
