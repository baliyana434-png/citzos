import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'crypto';

test('Security Engine: PBKDF2 Password Hashing & Timing-Safe Verification', async () => {
  const { hashCitizenPassword, verifyCitizenPassword } = await import('../src/lib/db.ts');
  
  const password = 'StrongPassword123!';
  const { hash, salt } = hashCitizenPassword(password);
  
  assert.ok(hash && hash.length === 128, 'Hash must be 128-char hex (SHA512)');
  assert.ok(salt && salt.length === 32, 'Salt must be 32-char hex (16 bytes)');
  
  // Verify correct password
  assert.equal(verifyCitizenPassword(password, hash, salt), true, 'Correct password must verify');
  
  // Verify incorrect password
  assert.equal(verifyCitizenPassword('WrongPassword', hash, salt), false, 'Incorrect password must reject');
  
  // Verify empty password
  assert.equal(verifyCitizenPassword('', hash, salt), false, 'Empty password must reject');
});

test('Security Engine: Session Token Signing & Validation', async () => {
  const { SessionSecurityService } = await import('../src/lib/security.ts');
  
  const citizenId = 'cit-IN-123456';
  const email = 'citizen@example.com';
  const token = SessionSecurityService.generateSessionToken(citizenId, email);
  
  assert.ok(token.includes('.'), 'Session token must be payload.signature format');
  
  const verified = SessionSecurityService.verifySessionToken(token);
  assert.equal(verified.valid, true, 'Valid token must verify');
  assert.equal(verified.citizenId, citizenId, 'Citizen ID must match');
  assert.equal(verified.email, email, 'Email must match');
  
  // Tampered payload
  const [payload, sig] = token.split('.');
  const tamperedSig = sig.slice(0, -4) + 'zzzz';
  const tamperedVerified = SessionSecurityService.verifySessionToken(`${payload}.${tamperedSig}`);
  assert.equal(tamperedVerified.valid, false, 'Tampered signature must reject');
});

test('Security Engine: Admin Token Cryptographic Isolation', async () => {
  const { AdminSecurityService, SessionSecurityService } = await import('../src/lib/security.ts');
  
  const adminToken = AdminSecurityService.generateAdminToken();
  assert.equal(AdminSecurityService.verifyAdminToken(adminToken), true, 'Admin token must verify');
  
  // User session token cannot masquerade as admin
  const userToken = SessionSecurityService.generateSessionToken('cit-user', 'user@example.com');
  assert.equal(AdminSecurityService.verifyAdminToken(userToken), false, 'User session cannot verify as Admin');
  
  // Tampered admin token
  const [payload, sig] = adminToken.split('.');
  assert.equal(AdminSecurityService.verifyAdminToken(`${payload}.forged_sig`), false, 'Forged admin signature must reject');
});
