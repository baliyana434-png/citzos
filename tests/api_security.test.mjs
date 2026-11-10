import test from 'node:test';
import assert from 'node:assert/strict';

test('API Security: Notifications send-push requires admin token', async () => {
  const { POST: sendPushPost, GET: sendPushGet } = await import('../src/app/api/notifications/send-push/route.ts');
  const { NextRequest } = await import('next/server');
  
  // Unauthenticated GET
  const unauthGetReq = new NextRequest('http://localhost:3000/api/notifications/send-push', {
    method: 'GET',
  });
  const getRes = await sendPushGet(unauthGetReq);
  assert.equal(getRes.status, 401, 'Unauthenticated GET must return 401');
  
  // Unauthenticated POST
  const unauthPostReq = new NextRequest('http://localhost:3000/api/notifications/send-push', {
    method: 'POST',
    body: JSON.stringify({ title: 'Spam alert', body: 'Hack message' }),
  });
  const postRes = await sendPushPost(unauthPostReq);
  assert.equal(postRes.status, 401, 'Unauthenticated POST must return 401');
});

test('API Security: Admin Auth enforces PIN format and rejection', async () => {
  const { POST: adminAuthPost } = await import('../src/app/api/admin/auth/route.ts');
  const { NextRequest } = await import('next/server');
  
  // Empty PIN
  const emptyReq = new NextRequest('http://localhost:3000/api/admin/auth', {
    method: 'POST',
    body: JSON.stringify({ pin: '' }),
  });
  const emptyRes = await adminAuthPost(emptyReq);
  assert.equal(emptyRes.status, 400, 'Empty PIN must return 400');
  
  // Invalid PIN format (<6 digits)
  const shortReq = new NextRequest('http://localhost:3000/api/admin/auth', {
    method: 'POST',
    body: JSON.stringify({ pin: '123' }),
  });
  const shortRes = await adminAuthPost(shortReq);
  assert.equal(shortRes.status, 400, 'Short PIN must return 400');
  
  // Incorrect PIN
  const wrongReq = new NextRequest('http://localhost:3000/api/admin/auth', {
    method: 'POST',
    body: JSON.stringify({ pin: '000000' }),
  });
  const wrongRes = await adminAuthPost(wrongReq);
  assert.equal(wrongRes.status, 401, 'Wrong PIN must return 401');
});
