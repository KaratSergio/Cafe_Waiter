export function isUniqueConstraintError(error: any): boolean {
  return error.code === '23505'; // PostgreSQL error code "unique_violation"
}
