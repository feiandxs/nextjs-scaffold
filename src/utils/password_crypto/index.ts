// src/utils/password_crypto/index.ts

/**
 * Hashes a password using PBKDF2 with SHA-256.
 *
 * @param password - The password to hash.
 * @param providedSalt - Optional salt to use. If not provided, a random salt will be generated.
 * @returns A string containing the salt and hash, separated by a colon.
 */
export async function hashPassword(
  password: string,
  providedSalt?: Uint8Array,
): Promise<string> {
  const encoder = new TextEncoder();
  // Use provided salt if available, otherwise generate a new one
  const salt = providedSalt || crypto.getRandomValues(new Uint8Array(16));

  // Import the password as a key
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey'],
  );

  // Derive a key using PBKDF2
  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000, // Maximum allowed by Cloudflare Workers
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  );

  // Export the key to raw format
  const exportedKey = await crypto.subtle.exportKey('raw', key);
  const hashBuffer = new Uint8Array(exportedKey);

  // Convert hash and salt to hex strings
  const hashHex = Array.from(hashBuffer)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  const saltHex = Array.from(salt)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  // Return the salt and hash combined
  return `${saltHex}:${hashHex}`;
}

/**
 * Verifies a password against a stored hash.
 *
 * @param storedHash - The stored hash (including salt) to compare against.
 * @param passwordAttempt - The password attempt to verify.
 * @returns A boolean indicating whether the password is correct.
 * @throws Error if the salt or hash format is invalid.
 */
export async function verifyPassword(
  storedHash: string,
  passwordAttempt: string,
): Promise<boolean> {
  const [saltHex, originalHash] = storedHash.split(':');
  const matchResult = saltHex.match(/.{1,2}/g);
  if (!matchResult) {
    throw new Error('Invalid salt format');
  }

  // 如果 originalHash 不存在，也应该抛出错误
  if (!originalHash) {
    throw new Error('Invalid hash format');
  }

  // Convert salt from hex to Uint8Array
  const salt = new Uint8Array(matchResult.map((byte) => parseInt(byte, 16)));

  // Hash the password attempt with the same salt
  const attemptHashWithSalt = await hashPassword(passwordAttempt, salt);
  const [, attemptHash] = attemptHashWithSalt.split(':');

  // Compare the hashes
  return attemptHash === originalHash;
}
