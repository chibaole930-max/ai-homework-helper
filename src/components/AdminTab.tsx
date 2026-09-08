import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  Loader2,
  Save,
  LogOut,
  Megaphone,
  Wrench,
  X,
  Check,
  ClipboardList,
} from 'lucide-react';

interface SiteSettings {
  maintenance: { enabled: boolean; message: string };
  announcement: { enabled: boolean; text: string };
}

const TOKEN_KEY = 'admin_token';

export default function AdminTab() {
  const [token, setToken] = useState<string>(
    () => sessionStorage.getItem(TOKEN_KEY) || ''
  );
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch('/api/admin/settings', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (r) => {
        if (r.status === 401) {
          sessionStorage.removeItem(TOKEN_KEY);
          setToken('');
          return null;
        }
        if (!r.ok) throw new Error('Không tải được cài đặt.');
        return r.json();
      })
      .then((d) => {
        if (d) setSettings(d as SiteSettings);
      })
      .catch((err) => setSaveMsg({ ok: false, text: err.message }))
      .finally(() => setLoading(false));
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Đăng nhập thất bại.');
      sessionStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setPassword('');
    } catch (err: any) {
      setLoginError(err.message || 'Đăng nhập thất bại.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    setSaveMsg(null);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Không lưu được cài đặt.');
      setSettings(data as SiteSettings);
      setSaveMsg({ ok: true, text: 'Đã lưu và áp dụng cho toàn bộ người dùng.' });
      setTimeout(() => setSaveMsg(null), 3000);
    } catch (err: any) {
      setSaveMsg({ ok: false, text: err.message || 'Không lưu được cài đặt.' });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    fetch('/api/admin/logout', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => {});
    sessionStorage.removeItem(TOKEN_KEY);
    setToken('');
    setSettings(null);
  };

  if (!token) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <form
            onSubmit={handleLogin}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5"
          >
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600">
                <Shield className="w-7 h-7" />
              </div>
              <h1 className="text-xl font-extrabold text-slate-900">Quản Trị Web Admin</h1>
              <p className="text-xs text-slate-500">
                Trang dành cho quản trị viên. Nhập mật khẩu quản trị để tiếp tục.
              </p>
            </div>

            <label className="block">
              <span className="text-xs font-bold text-slate-600 mb-1 block">Mật khẩu quản trị</span>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoFocus
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
                />
              </div>
            </label>

            {loginError && (
              <div className="px-3 py-2 rounded-xl text-xs bg-red-50 border border-red-200 text-red-700">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loggingIn || !password.trim()}
              className="w-full py-2.5 text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white flex items-center justify-center gap-2"
            >
              {loggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang kiểm tra...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  Đăng Nhập Quản Trị
                </>
              )}
            </button>

            <p className="text-[11px] text-slate-400 text-center">
              Để đăng nhập được, admin phải khai báo biến môi trường{' '}
              <code className="bg-slate-100 px-1 rounded">ADMIN_PASSWORD</code> trên server.
            </p>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">Trang Quản Trị</h1>
            <p className="text-xs text-slate-500">Bảo trì hệ thống & gửi thông báo</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-3 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          Đăng Xuất
        </button>
      </div>

      {saveMsg && (
        <div
          className={`px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 ${
            saveMsg.ok
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}
        >
          {saveMsg.ok ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
          {saveMsg.text}
        </div>
      )}

      {/* Chế độ bảo trì */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-amber-100 text-amber-600">
              <Wrench className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-800">Chế Độ Bảo Trì</h2>
              <p className="text-[11px] text-slate-500">
                Khi bật: khóa AI soạn bài/giải bài & đóng góp bài mẫu, người dùng thấy màn hình bảo trì.
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={settings?.maintenance.enabled || false}
              onChange={(e) =>
                setSettings((prev) =>
                  prev
                    ? { ...prev, maintenance: { ...prev.maintenance, enabled: e.target.checked } }
                    : prev
                )
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-amber-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-slate-200 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-600 mb-1 block">
            Thông báo bảo trì (hiện cho học sinh)
          </label>
          <textarea
            value={settings?.maintenance.message || ''}
            onChange={(e) =>
              setSettings((prev) =>
                prev
                  ? { ...prev, maintenance: { ...prev.maintenance, message: e.target.value } }
                  : prev
              )
            }
            rows={2}
            placeholder="VD: Hệ thống đang nâng cấp, vui lòng quay lại lúc 14h."
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-amber-300 focus:ring-2 focus:ring-amber-100 outline-none"
          />
        </div>
      </div>

      {/* Gửi thông báo */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-sky-100 text-sky-600">
              <Megaphone className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-800">Thông Báo Cho Học Sinh</h2>
              <p className="text-[11px] text-slate-500">
                Banner toàn trang, có nút đóng. Sửa/xóa bất kỳ lúc nào.
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={settings?.announcement.enabled || false}
              onChange={(e) =>
                setSettings((prev) =>
                  prev
                    ? { ...prev, announcement: { ...prev.announcement, enabled: e.target.checked } }
                    : prev
                )
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:ring-2 peer-focus:ring-sky-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-slate-200 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
          </label>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-600 mb-1 block">Nội dung thông báo</label>
          <textarea
            value={settings?.announcement.text || ''}
            onChange={(e) =>
              setSettings((prev) =>
                prev
                  ? { ...prev, announcement: { ...prev.announcement, text: e.target.value } }
                  : prev
              )
            }
            rows={3}
            placeholder="VD: Tuần này hệ thống bình thường. Chúc các em học tốt!"
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-sky-300 focus:ring-2 focus:ring-sky-100 outline-none"
          />
        </div>

        <div className="px-3 py-2 rounded-xl bg-slate-50 text-[11px] text-slate-500 flex items-start gap-1.5">
          <ClipboardList className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>
            Nhấn <b>Lưu cài đặt</b> bên dưới để áp dụng ngay. Nếu chưa kích hoạt bảo trì, banner thông
            báo sẽ hiện trên mọi trang trong ~60 giây.
          </span>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving || !settings}
          className="px-6 py-2.5 text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white flex items-center gap-2"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Đang lưu...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Lưu cài đặt
            </>
          )}
        </button>
      </div>
    </div>
  );
}