
/**
 * Generates a cryptographically secure random salt.
 * @returns A hex-encoded string representing the salt.
 */
export function generateSalt(length: number = 16): string {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Hashes a password with a given salt using SHA-256.
 * @param password The plaintext password to hash.
 * @param salt The salt to combine with the password. Can be an empty string.
 * @returns A promise that resolves to the hex-encoded hash.
 */
export async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}
