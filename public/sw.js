/* Service Worker cho Push Notification (Web Push API chuẩn)
 * Đăng ký từ public/ để trình duyệt có thể nhận push kể cả khi tab đóng. */
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  let data = { title: 'Học Tập', body: '', url: '/' };
  try {
    const parsed = JSON.parse(event.data ? event.data.text() : '{}');
    data = { title: parsed.title || data.title, body: parsed.body || '', url: parsed.url || '/' };
  } catch {
    // ignore
  }

  const options = {
    body: data.body,
    icon: '/favicon-192.png',
    badge: '/favicon-192.png',
    vibrate: [100, 50, 100],
    data: { url: data.url },
    actions: [{ action: 'open', title: 'Mở ứng dụng' }],
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const urlToOpen = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          client.navigate(urlToOpen);
          return client.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(urlToOpen);
      return null;
    })
  );
});