import { authHeaders } from './auth';

const SW_PATH = '/sw.js';

/** Đăng ký service worker cho push notifications. */
export async function registerServiceWorker(): Promise<boolean> {
  if (!('serviceWorker' in navigator)) return false;
  try {
    await navigator.serviceWorker.register(SW_PATH);
    return true;
  } catch {
    return false;
  }
}

/** Đăng ký subscription push ngay sau khi đăng nhập. */
export async function subscribePush(): Promise<boolean> {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return false;
  try {
    const reg = await navigator.serviceWorker.ready;
    if (!reg.pushManager) return false;

    // Lấy VAPID public key từ server
    const keyRes = await fetch('/api/push/vapid-key');
    if (!keyRes.ok) return false;
    const { publicKey } = await keyRes.json();

    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey as string),
      });
    }

    const res = await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(sub.toJSON()),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Hủy subscription push khi đăng xuất. */
export async function unsubscribePush(): Promise<void> {
  try {
    if (!('serviceWorker' in navigator)) return;
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (!sub) return;
    const endpoint = sub.endpoint;
    await sub.unsubscribe();
    fetch('/api/push/unsubscribe', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ endpoint }),
    }).catch(() => {});
  } catch {
    // ignore
  }
}

/** Chuyển base64url -> Uint8Array cho applicationServerKey. */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = window.atob(base64);
  const output = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) output[i] = raw.charCodeAt(i);
  return output;
}