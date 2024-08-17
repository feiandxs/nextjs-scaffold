// src/utils/password_crypto/index.test.ts

import { hashPassword, verifyPassword } from './index';

describe('Password Crypto Utils', () => {
  const testPassword = 'mySecurePassword123';

  it('should hash a password', async () => {
    const hashedPassword = await hashPassword(testPassword);
    expect(hashedPassword).toBeTruthy();
    expect(hashedPassword.split(':')).toHaveLength(2);
  });

  it('should verify a correct password', async () => {
    const hashedPassword = await hashPassword(testPassword);
    const isValid = await verifyPassword(hashedPassword, testPassword);
    expect(isValid).toBe(true);
  });

  it('should reject an incorrect password', async () => {
    const hashedPassword = await hashPassword(testPassword);
    const isValid = await verifyPassword(hashedPassword, 'wrongPassword');
    expect(isValid).toBe(false);
  });

  it('should generate different hashes for the same password', async () => {
    const hash1 = await hashPassword(testPassword);
    const hash2 = await hashPassword(testPassword);
    expect(hash1).not.toBe(hash2);
  });

  // it('should throw an error for invalid salt format', async () => {
  //   await expect(verifyPassword('invalid:hash', testPassword))
  //     .rejects.toThrow('Invalid salt format');
  // });
});
