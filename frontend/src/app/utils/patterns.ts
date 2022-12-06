/** Regex for email validation
 * @example: something@something.something, or *@*.*.
 */
export const emailPattern = /\S+@\S+\.\S+/;

/** Regex for password validation
 * @example: df6g@jkhdfgE@5.
 */
export const passwordPattern =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

// ^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$
