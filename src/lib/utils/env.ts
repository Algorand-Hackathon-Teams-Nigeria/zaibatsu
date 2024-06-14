/**
 * Returns the value of an environment variable.
 * Throws an error if not found
 */
export function expectEnvVar(name: string): string {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`Environment Variable ${name} is not set`, {
      cause: "missing-environment-variable",
    });
  }

  return value;
}
